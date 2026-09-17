import { NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const runtime = "nodejs";

const assets = [
  { key: "unique-products/cpu-9800x3d.webp", url: "https://uc22e9911b773c21f38055f017b9.dl.dropboxusercontent.com/cd/0/get/DIRGnuPJnmhTB4U-7d-HcOF5jBwHKBjNd5ODFzOuhjqeWEQS84WPNuKpTs7US0RgJ3Kr5e666kUa4xW1UmB1bAFDFkjWqHSpetBpOGUj2rhM73DFJg0tYz2G-jNSec0yCiF8Q5bgfaO9xPvXadCh7kSH8cOwsWDyaA7m9pJ7uYW1eg/file?c_luid=f3923c08", expected: 150756 },
  { key: "unique-products/cpu-9700x.webp", url: "https://ucf1382f4a858396013b1928427b.dl.dropboxusercontent.com/cd/0/get/DIRiNZOJgrEzyirVUn7VobhqkaTsf1MVGQKCLldU4KZf67pilR_C6s--2OCWtuyvldbf3eI0v47Rrk4kMfwqpuC8mHek2WzF9yGiln2nBirfcyZLXAjfSNxtJWBfxuuNkO6SOV0oodqf1Dbbetg6C6zUKDINbPqzc6wbzK-HZXmsmA/file?c_luid=f3923c08", expected: 181338 },
  { key: "unique-products/cpu-9600x.webp", url: "https://uc8ab928fd8460482c5b5b0259f4.dl.dropboxusercontent.com/cd/0/get/DITefbWNYBym4rte85koArAWkgJB9S4rXaNxQKqyFmmZnm8wcsUkdWih12XJR7oNywfMNHlsDoobhh6_yJc-X3aLtDVJ7oxDpN80WvLp1NhiitXv-sG_OQK3hmWF--0A7J7jadyNzVKEAAuC9kP65GlggPo7YVZGniAMCiye3Q5tkw/file?c_luid=f3923c08", expected: 152804 },
  { key: "unique-products/mb-x870.webp", url: "https://uc77f0aac3f558c364b5c57f5b05.dl.dropboxusercontent.com/cd/0/get/DIQe0P-7RvLpYjcQ3LoercgM2k59Nn_80GIta8NQSsML5GAbjtrcXsfB2K7JDnoJ0KzI35G5cgwIMlvjnpAXKKrGb37tRInBVq6bAkiSanAMEoC1oYhSfsjaqdtMAdvVB3VmJMdtQqMPaTyYSnQFoz-FfNkDNeiraJVbQQ9xHxiIug/file?c_luid=f3923c08", expected: 188932 },
  { key: "unique-products/gpu-64cor3.webp", url: "https://uc1a9e891880abbb2f8d1337ae02.dl.dropboxusercontent.com/cd/0/get/DITfiYrNRr6wKMUUL12PqMTyByTfAxppKVBvMgutvS_YdNoDQBXw8HMptki1X_Fzpe6Y2ecfdqwyYwkgDwp8qEs4b6oeTqey8WVx1lgWYK6UGat23RovZYZzcQdxzzNWf_IDjhVaz9ENO_PXPU6he9PtKcjFLyhe9Nv1WbK4K7k_Aw/file?c_luid=f3923c08", expected: 150648 },
  { key: "unique-products/gpu-48cor3.webp", url: "https://uc1d633b000494c10033af5acd4e.dl.dropboxusercontent.com/cd/0/get/DIQ7g264ooALButm4y5DCNXhy4IpiRDo78YBR52W85pINHk-l4Kvfp9cLl7q4YAzHvTU5ZZSgF_2Mdf4b1hgyUcEI7PNkbVjgeHPiJPTT4tUgEnvQ9hAcKGFq_pwBkzpZxjt-8NrTyU1Cshd9IpRcNl0TQGFbAUxU9LONw-mai68fQ/file?c_luid=f3923c08", expected: 153284 },
  { key: "unique-products/gpu-32cor3.webp", url: "https://uc99cf919c930cb88d32101da820.dl.dropboxusercontent.com/cd/0/get/DITVGoFRz4kU6Ni6JtdDOniIwlQ7vj_2gAyH1NVNs30PubLnzSpU5VbsYabec3wRUKnfmcP7PnLAc6cUOmPa3p8kD2zheZG0NbZ3ksV1r61jRr_-O_5jHV6WF60FTcgl5SeL8O5lk4J_wOLNrdVJM_C8x3tHPQIyAt9sP6BAwjh4Tw/file?c_luid=f3923c08", expected: 97380 },
  { key: "unique-products/psu-850.webp", url: "https://ucd84b4a694d8f6fcbde5b7c2ca3.dl.dropboxusercontent.com/cd/0/get/DIR3sC9VWK7Fs6aOWOEa4IocytbSYICovvabp2_27LtRWGPnG0N8eYTXe6NV_FfmQ2cvP-ooLfsNMfcZ6UTssWBy4pbZAfWQCE9oR5qyMCbSk7h-H2Ox85SYSnmSjd2AgGPqpZTg6XzbkIQ1MWnG7tycObN4E0Ii0uSOE62MP6BdxQ/file?c_luid=f3923c08", expected: 178700 },
  { key: "unique-products/psu-750.webp", url: "https://ucc1bac9ad5d11b8dc578e652bee.dl.dropboxusercontent.com/cd/0/get/DIR_nCEGK_xxp13BUhUGYfk4P6CFCATzMhLd6IogntLAfcAYDuHY71pQSXHlkpRd7PCMwe9niNFMoPSqE8J3-Oy-eBVcKHDuiyKEZ4oAtgRtZO-LtpVUjM81T4kkpwmT46HPBIevoBxQw6_Za81bZSLRzgK4RWyiLlx1AEBIUjViDw/file?c_luid=f3923c08", expected: 165528 },
  { key: "unique-products/psu-1000.webp", url: "https://uc9fcf4c4a211d9e9446e9098ee0.dl.dropboxusercontent.com/cd/0/get/DIQFMHt-ej5QIKEwkrH2E1WzaUoJd7cj0WDCRa0NT2ykmwEqkLmXXkuzFabIVsht5J3o2muqkep1GHwSe2cHitYPYl7FPi0PcdhTm1GOw_xHmTvJ0yYKhgzAYpoWMYB1dXSpQh_oxhiWEI4qgcLj7Gf04yWibCm-KK_6aGN7we6BXw/file?c_luid=f3923c08", expected: 157492 },
] as const;

function client() {
  return new S3Client({
    region: process.env.REGION,
    endpoint: process.env.ENDPOINT,
    forcePathStyle: true,
    credentials: { accessKeyId: process.env.ACCESS_KEY_ID || "", secretAccessKey: process.env.SECRET_ACCESS_KEY || "" },
  });
}

async function migrate() {
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
  const ok = results.every(x => x.ok);
  return NextResponse.json({ ok, results }, { status: ok ? 200 : 502 });
}

export async function GET() { return migrate(); }
export async function POST() { return migrate(); }
