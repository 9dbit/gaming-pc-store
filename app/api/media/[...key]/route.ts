import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const runtime = "nodejs";

function client() {
  return new S3Client({
    region: process.env.REGION,
    endpoint: process.env.ENDPOINT,
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID || "",
      secretAccessKey: process.env.SECRET_ACCESS_KEY || "",
    },
  });
}

export async function GET(_req: NextRequest, ctx: { params: Promise<{ key: string[] }> }) {
  try {
    const { key } = await ctx.params;
    const objectKey = key.join("/");
    if (!objectKey || objectKey.includes("..")) return new NextResponse("Bad Request", { status: 400 });

    const obj = await client().send(new GetObjectCommand({ Bucket: process.env.BUCKET, Key: objectKey }));
    if (!obj.Body) return new NextResponse("Not Found", { status: 404 });

    const bytes = await obj.Body.transformToByteArray();
    const body = Buffer.from(bytes);
    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": obj.ContentType || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
        ...(obj.ETag ? { ETag: obj.ETag } : {}),
      },
    });
  } catch {
    return new NextResponse("Not Found", { status: 404 });
  }
}
