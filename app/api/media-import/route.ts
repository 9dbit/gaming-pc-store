import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const runtime = "nodejs";

const imports = {
  "rpg-mobile": { env: "IMPORT_RPG_MOBILE", key: "heroes/mobile/hero-rpg-mobile.webp", type: "image/webp", expected: 473542 },
  "racing-mobile": { env: "IMPORT_RACING_MOBILE", key: "heroes/mobile/hero-racing-mobile.webp", type: "image/webp", expected: 398240 },
  "god-mobile": { env: "IMPORT_GOD_MOBILE", key: "heroes/mobile/hero-god-mobile.webp", type: "image/webp", expected: 514342 },
  "rpg-desktop": { env: "IMPORT_RPG_DESKTOP", key: "heroes/desktop/hero-rpg-desktop.png", type: "image/png", expected: 2739430 },
  "racing-desktop": { env: "IMPORT_RACING_DESKTOP", key: "heroes/desktop/hero-racing-desktop.png", type: "image/png", expected: 2272935 },
  "god-desktop": { env: "IMPORT_GOD_DESKTOP", key: "heroes/desktop/hero-god-desktop.png", type: "image/png", expected: 2798702 },
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
  const source = process.env[config.env];
  if (!source) return NextResponse.json({ error: "missing source" }, { status: 500 });

  const url = new URL(source);
  if (!url.hostname.endsWith("dropboxusercontent.com")) {
    return NextResponse.json({ error: "invalid source host" }, { status: 400 });
  }

  const response = await fetch(source, { cache: "no-store" });
  if (!response.ok) return NextResponse.json({ error: "source fetch failed", status: response.status }, { status: 502 });
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length !== config.expected) {
    return NextResponse.json({ error: "size mismatch", expected: config.expected, actual: bytes.length }, { status: 400 });
  }

  await client().send(new PutObjectCommand({
    Bucket: process.env.BUCKET,
    Key: config.key,
    Body: bytes,
    ContentType: config.type,
    CacheControl: "public, max-age=31536000, immutable",
  }));

  return NextResponse.json({ ok: true, slot, key: config.key, bytes: bytes.length, url: `/api/media/${config.key}` });
}
