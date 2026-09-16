import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const runtime = "nodejs";

const sources = {
  storage: {
    source: "https://commons.wikimedia.org/wiki/Special:Redirect/file/KIOXIA_BG6_512GB_NVME_SSD.jpg",
    key: "products/storage/nvme-ssd.jpg",
  },
  "power-supply": {
    source: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Power_supply.JPG",
    key: "products/power-supply/atx-psu.jpg",
  },
  "gaming-case": {
    source: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Midi_tower_PC_case.jpg",
    key: "products/gaming-case/mid-tower-case.jpg",
  },
  monitor: {
    source: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Computer_monitor.jpg",
    key: "products/monitor/gaming-monitor.jpg",
  },
  cable: {
    source: "https://commons.wikimedia.org/wiki/Special:Redirect/file/HDMI_Cable.JPG",
    key: "products/cable/hdmi-cable.jpg",
  },
  cooling: {
    source: "https://commons.wikimedia.org/wiki/Special:Redirect/file/CPU_air_cooler.jpg",
    key: "products/cooling/cpu-air-cooler.jpg",
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
  const slot = req.nextUrl.searchParams.get("slot") as keyof typeof sources | null;
  if (!slot || !sources[slot]) return NextResponse.json({ error: "invalid slot" }, { status: 400 });
  const config = sources[slot];
  const response = await fetch(config.source, { cache: "no-store", redirect: "follow", headers: { "User-Agent": "NEXRIG/1.0" } });
  if (!response.ok) return NextResponse.json({ error: "source fetch failed", status: response.status }, { status: 502 });
  const bytes = Buffer.from(await response.arrayBuffer());
  if (!bytes.length || bytes.length > 8_000_000) return NextResponse.json({ error: "invalid image size", bytes: bytes.length }, { status: 400 });
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
