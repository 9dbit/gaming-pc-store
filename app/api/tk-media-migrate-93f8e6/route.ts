import { NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const runtime = "nodejs";

const assets = [
  { key: "tuan-kuda/heroes/hero-rpg.webp", url: "https://uc5c7af17bd086ee1a60bca6aeb0.dl.dropboxusercontent.com/cd/0/get/DISVMjCJ5nU_AqWtyBEHiRfp3PVb8ua0EyItXNAKrb8WqTdG1rFBqI6vgrHm-pSpW33wKNmGDcKpC7gszKe0UgGR5Y32EQhaT71DGF791LQOYtZLLCmalvLrJhTbDmHobPejJjmABQZNGRe3SaQGT8cLIWlCxsyI1MHt0hpEu6eqDQ/file?c_luid=f3923c08", expected: 335294 },
  { key: "tuan-kuda/heroes/hero-racing.webp", url: "https://uce5265facab264bf393f88f1bfb.dl.dropboxusercontent.com/cd/0/get/DIRohW1-_7EcYGmgUD9DNWn14SK160MvOKWnMHH_5B45zWxSw1AYaPAo7-HM4UxsjS2TxlJR7yFrUX4BJcEOwiboWZuDHUywoqM5lmeP0W0y9co87juwy0q-jWQmaLbwW0IPBrubffuebk2-Tlhri6Eyu_54rlU_H7NT6seUL6g6ow/file?c_luid=f3923c08", expected: 337010 },
  { key: "tuan-kuda/heroes/hero-god.webp", url: "https://uc82aa793fd846634d128e09fee8.dl.dropboxusercontent.com/cd/0/get/DITncjeWqxW2BHo_IAqNQNB0JqoNZnLhNWMveX2pRiMAGDXPy4VSkDk-EiqvOIqBanH7k207ihG5ZVfvivBTw7LWK8fEv6RuA2kloygwLuHX4LR3M_4W62Zkv-jJDVFy6FJLHGfd7BfzNbi1dE2L1NJlZQHiX9XKd6nKWKNwx_WI5A/file?c_luid=f3923c08", expected: 431838 },
  { key: "tuan-kuda/products/gpu/rtx-sl64cor3.webp", url: "https://ucf815d64b92d4aad2ed6acdd452.dl.dropboxusercontent.com/cd/0/get/DIQ1RqZOVIqfjrZ5ZUV-JDYGPq6s9MljDBDLjy7LXGhJETvXntFnf8yWIBjcIOOsnuhtPiEKNp-msMjwPMbrvJneDtcrX-d2t1TiQRG2qg20CjnHoYpi1xu-kHZb64SzjDj-oPy3_UA0X3opOw5gruH9FqCL_eg1vHUyTuvM9zCq2Q/file?c_luid=f3923c08", expected: 236848 },
  { key: "tuan-kuda/products/storage/gen5-nvme-2tb.webp", url: "https://ucddf980e8404dc53aa94e68e0b6.dl.dropboxusercontent.com/cd/0/get/DISYXeOyyTrovfXxEa9tpvWJqNLgUfDzfSxOJNNFKabE2kWIp4S3KmCRB3Sr-KlTelaxvllxqf1sDx14pT0yQ7KmLhAUv8Zh8c6cSMbuXusYp_EzLtXZSh4sfYtmnxopuwWxnioNqXmDBHBtfCLDKZhYzmqJudU72x0qSveppiIvHQ/file?c_luid=f3923c08", expected: 251792 },
  { key: "tuan-kuda/products/power-supply/850w-gold.webp", url: "https://uc2f5b9de96917174365cf1b9d62.dl.dropboxusercontent.com/cd/0/get/DITnVfmDh7K2-gvE8KqN0CyAcruCyYZfYP_-2rryu3dCb0ERP5NXaNXZWlIFbB1E5H1AzycRG6m2Pnp9jTo8MbHDfuwhO3_1-BADF06MmiFSSD20SRXDWXCi203ZqSE8nsIJHPVAJoHHoMkFUc3TK8XYDzZMXe3AibsigYgmTXNBng/file?c_luid=f3923c08", expected: 264358 },
  { key: "tuan-kuda/products/gaming-case/panorama-rgb.webp", url: "https://ucb288003a8bafac72be20b5d102.dl.dropboxusercontent.com/cd/0/get/DIQmcHbyYsEoB0syG4W23rM9B8kAe_Mm1ms_NSecJN1Zicc3ORhbmsU0DpsiCedqt9jdllyKM6gxWzP5TDr4PLGTVniBmoj0-vcACmlsee85B5q_J5VDJ8WtYSiV_ZC72z9lPqxjFxhgNtx4Q7US470f6X7P4N-hm9DZ1XjG82C-PA/file?c_luid=f3923c08", expected: 320936 },
  { key: "tuan-kuda/products/monitor/27-qhd-180hz.webp", url: "https://uca31a32f1cefe1ac7d72a3f4e50.dl.dropboxusercontent.com/cd/0/get/DITVyOFU_HzCDulLPVeopYYYPEWapNBoph_zkC-UoOLir_wbjqlazxff2-ayhFmoVwFwMFHwsXJ1g6PDouBXFivWoAH-SXQ0_oCugQ2jenLXw_lpFBByr7-aCRJGpRsSQ2vPb_mZShFQ92TvQfGjPNPkx2sP6T9vTMnGfDdp6uwQmg/file?c_luid=f3923c08", expected: 247702 },
  { key: "tuan-kuda/products/cable/premium-kit.webp", url: "https://uc5d8dd49e6cad232dd33eece513.dl.dropboxusercontent.com/cd/0/get/DIR-t1KT4Zk_c3v4BABzf96iHP0A9rFeOaiIQpazdw3lXAld0BjI5MUx2QjF93cQHJQ5eCmJAfpl0Q3xloXvNezdflDyQrjNGuQQBBDl01zSRDGi728nc0cDZ1djKw39-GiUmjGHPmetOaTnaY9mzmk9ylBKPipCfddpSSOeim7VVw/file?c_luid=f3923c08", expected: 278472 },
  { key: "tuan-kuda/products/cooling/360-aio.webp", url: "https://uc2b7d70045d0022691cc7d1dc50.dl.dropboxusercontent.com/cd/0/get/DIQXWwoR1f71vuCXSXz2BI_5HHg6lfuoldv9RXDqQH-EOgSa0e04AcGwPDoYYQRUaoJ6IujrSRFSuI5JouiLn6ZVGgLckt-9SefKYf4O7xUYMp0OghS-E_gKgAFtoLgFQ2ptd8pOch0Er1n9Pu85dKIc1wI80rNVdGl-JD0IofjsmA/file?c_luid=f3923c08", expected: 258728 },
] as const;

function client() {
  return new S3Client({
    region: process.env.REGION,
    endpoint: process.env.ENDPOINT,
    forcePathStyle: true,
    credentials: { accessKeyId: process.env.ACCESS_KEY_ID || "", secretAccessKey: process.env.SECRET_ACCESS_KEY || "" },
  });
}

export async function POST() {
  const s3 = client();
  const results = [];
  for (const asset of assets) {
    const response = await fetch(asset.url, { cache: "no-store" });
    if (!response.ok) {
      results.push({ key: asset.key, ok: false, status: response.status });
      continue;
    }
    const body = Buffer.from(await response.arrayBuffer());
    if (body.length !== asset.expected) {
      results.push({ key: asset.key, ok: false, bytes: body.length, expected: asset.expected });
      continue;
    }
    await s3.send(new PutObjectCommand({ Bucket: process.env.BUCKET, Key: asset.key, Body: body, ContentType: "image/webp", CacheControl: "public, max-age=31536000, immutable" }));
    results.push({ key: asset.key, ok: true, bytes: body.length });
  }
  return NextResponse.json({ ok: results.every(x => x.ok), results });
}
