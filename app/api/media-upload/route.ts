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

export async function POST(req: NextRequest) {
  const token = req.headers.get("x-upload-token");
  if (!process.env.MEDIA_UPLOAD_TOKEN || token !== process.env.MEDIA_UPLOAD_TOKEN) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const key = req.nextUrl.searchParams.get("key");
  const contentType = req.headers.get("content-type") || "application/octet-stream";
  if (!key || key.includes("..") || key.startsWith("/")) {
    return NextResponse.json({ error: "invalid key" }, { status: 400 });
  }

  const bytes = Buffer.from(await req.arrayBuffer());
  if (!bytes.length || bytes.length > 8_000_000) {
    return NextResponse.json({ error: "invalid size" }, { status: 400 });
  }

  await client().send(new PutObjectCommand({
    Bucket: process.env.BUCKET,
    Key: key,
    Body: bytes,
    ContentType: contentType,
    CacheControl: "public, max-age=31536000, immutable",
  }));

  return NextResponse.json({ ok: true, key, bytes: bytes.length, url: `/api/media/${key}` });
}
