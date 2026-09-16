import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const runtime = "nodejs";

const imports = {
  processor: {
    source: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1600&q=92",
    key: "products/processor/amd-ryzen-7-9800x3d.jpg",
  },
  motherboard: {
    source: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=92",
    key: "products/motherboard/x870-gaming-wifi.jpg",
  },
  gpu: {
    source: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=1600&q=92",
    key: "products/gpu/rtx-64-cor3-gaming-gpu.jpg",
  },
  memory: {
    source: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=1600&q=92",
    key: "products/memory/nexrig-ddr5-rgb-64-cor3.jpg",
  },
} as const;

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

export async function GET(req: NextRequest) {
  const slot = req.nextUrl.searchParams.get("slot") as keyof typeof imports | null;
  if (!slot || !imports[slot]) return NextResponse.json({ error: "invalid slot" }, { status: 400 });

  const config = imports[slot];
  const response = await fetch(config.source, { cache: "no-store" });
  if (!response.ok) return NextResponse.json({ error: "source fetch failed", status: response.status }, { status: 502 });

  const bytes = Buffer.from(await response.arrayBuffer());
  if (!bytes.length || bytes.length > 8_000_000) {
    return NextResponse.json({ error: "invalid image size", bytes: bytes.length }, { status: 400 });
  }

  const contentType = response.headers.get("content-type") || "image/jpeg";
  await client().send(new PutObjectCommand({
    Bucket: process.env.BUCKET,
    Key: config.key,
    Body: bytes,
    ContentType: contentType,
    CacheControl: "public, max-age=31536000, immutable",
  }));

  return NextResponse.json({ ok: true, slot, key: config.key, bytes: bytes.length, contentType, url: `/api/media/${config.key}` });
}
