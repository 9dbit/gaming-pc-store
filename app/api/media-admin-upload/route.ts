import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

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

export async function PUT(req: NextRequest) {
  try {
    const expected = process.env.MEDIA_UPLOAD_TOKEN || "";
    if (!expected || req.headers.get("x-upload-token") !== expected) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const key = req.nextUrl.searchParams.get("key") || "";
    if (!key || key.includes("..") || key.startsWith("/")) {
      return NextResponse.json({ error: "Invalid key" }, { status: 400 });
    }
    const contentType = req.headers.get("content-type") || "application/octet-stream";
    const bytes = Buffer.from(await req.arrayBuffer());
    if (!bytes.length || bytes.length > 8 * 1024 * 1024) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }
    await client().send(new PutObjectCommand({
      Bucket: process.env.BUCKET,
      Key: key,
      Body: bytes,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    }));
    return NextResponse.json({ ok: true, key, bytes: bytes.length });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
