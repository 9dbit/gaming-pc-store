import { NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const runtime = "nodejs";

const assets = [
  { key: "tuan-kuda/final/hero-quest.png", url: "https://ucf412dcd10353a61aecad9f5f76.dl.dropboxusercontent.com/cd/0/get/DIV3PeWD2eZSBontNTBDZhUubza3CMw55tH1o1X3wNj76kVALpP7rZYfUJKAK_rIvSDVSBgDef4WI5MZf02bZ7Zf64LouTftenOuRiJ_jqa4_fbdmIF_nyU9vNQae4ex7fZHGT1dXvnKRVNiztjkcP1DGte8n2ewckYJtygxEoSmNg/file?c_luid=f3923c08", expected: 2786391 },
  { key: "tuan-kuda/final/hero-god.png", url: "https://uc282a2931761300042699e7c1c2.dl.dropboxusercontent.com/cd/0/get/DIVUKA_s1PW1Y3o1NXb7hUyWJUHt_M_xKxBBZ0gWQJ1eqiaOe9lxk5hbEQdIFeAEe5hyj-toxgbmSuDrItfsTKmJGjpCkA-q1zZFC1pQ3_4hiHyAw7bOPo6gPbMEiYYo-h18sCYOTApo1ruBUiaSnONYGZMlM0Tduyv1QK5Gc8n5Mw/file?c_luid=f3923c08", expected: 2755725 },
  { key: "tuan-kuda/final/hero-racing.png", url: "https://ucb702e9eee690ec2bccdd7c1bfb.dl.dropboxusercontent.com/cd/0/get/DIVnSTT7zUbfY-Mc8omXkFg_msH-HUjE9O3NBVEY7jo4VaJS1Qh8y0QK4xJGQ4iRC_6oyLNXHrvU1nzIgiMwXJFjE2ve8WInVz7askMbjkSqQGP0P_s-qXtHPhZOReHLNj15R-ThibYSa2Hu_PralJMLwsQKq_WEQt4HnukkDMMFVg/file?c_luid=f3923c08", expected: 2675501 },
  { key: "tuan-kuda/final/gpu-rtx-power.png", url: "https://ucda236b84cf24c9dcfe240429cb.dl.dropboxusercontent.com/cd/0/get/DIVgqrUy6SLWgJVlu6RtdPjJIEQT-d_RUx-VZe4mQN3Jxwk8SO8Latp8UTPaBGyA0dZ2-vipQmZUMS2bHWaUibGtlv280TdvGcB367E6TYPWV0hApEUwZk5vPS0qvsgydbocKjtuQbAcLpmPZ7wZAkJqddjAtD4i877TyBEIxJXBPA/file?c_luid=f3923c08", expected: 2287911 },
  { key: "tuan-kuda/final/storage-speed-builds.png", url: "https://uc40a05dfe5fc697c1c1f84a6e67.dl.dropboxusercontent.com/cd/0/get/DIUhRSIvmyi6hxLy4CWYsZHsEQP7IApd7V2URKJ4uQlWw2uWoyIc6AYty1xbahHDCuvHQ4Sg7F7YbbZErO2gsb5IG_RdK2OpIj408M2HrNNwRT_g7J5AEuhQYxCeOde2Uu8dCIVrRULWWYxhM0TvTmulQ97xLjo4hTjimSI09l1oyA/file?c_luid=f3923c08", expected: 2442207 },
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
    if (!response.ok) { results.push({key:asset.key,ok:false,status:response.status}); continue; }
    const body = Buffer.from(await response.arrayBuffer());
    if (body.length !== asset.expected) { results.push({key:asset.key,ok:false,bytes:body.length,expected:asset.expected}); continue; }
    await s3.send(new PutObjectCommand({Bucket:process.env.BUCKET,Key:asset.key,Body:body,ContentType:"image/png",CacheControl:"public, max-age=31536000, immutable"}));
    results.push({key:asset.key,ok:true,bytes:body.length});
  }
  const ok=results.every(x=>x.ok);
  return NextResponse.json({ok,results},{status:ok?200:500});
}

export async function GET(){return migrate();}
export async function POST(){return migrate();}
