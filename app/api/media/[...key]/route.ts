import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const runtime = "nodejs";

const overrides: Record<string, string> = {
  "products/gpu/rtx-64-cor3-gaming-gpu.jpg": "/media/tuan-kuda/products/gpu.webp",
  "products/storage/nvme-ssd.jpg": "/media/tuan-kuda/products/storage.webp",
  "products/power-supply/atx-psu.jpg": "/media/tuan-kuda/products/psu.webp",
  "products/gaming-case/mid-tower-case.jpg": "/media/tuan-kuda/products/case.webp",
  "products/monitor/gaming-monitor.jpg": "/media/tuan-kuda/products/monitor.webp",
  "products/cable/hdmi-cable.jpg": "/media/tuan-kuda/products/cable.webp",
  "products/cooling/cpu-air-cooler.jpg": "/media/tuan-kuda/products/cooling.webp",
};

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

export async function GET(req: NextRequest, ctx: { params: Promise<{ key: string[] }> }) {
  try {
    const { key } = await ctx.params;
    const objectKey = key.join("/");
    if (!objectKey || objectKey.includes("..")) return new NextResponse("Bad Request", { status: 400 });

    const replacement = overrides[objectKey];
    if (replacement) return NextResponse.redirect(new URL(replacement, req.url), 307);

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
