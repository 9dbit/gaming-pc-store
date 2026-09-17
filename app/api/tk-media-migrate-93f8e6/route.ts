import { NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const runtime = "nodejs";

const assets = [
  { key: "unique-products/mb-b850.webp", url: "https://uc053870ecdc599229233e8a1275.dl.dropboxusercontent.com/cd/0/get/DIQAT2O6Td83ll-_DEAivEUE3vXMVzNa8SVyS1YNsD-Ckl-iZ-LNNqB5VN2D7S5PnPIk4qlhFeqP2PZvZLHuYJS0oqZOgNPI6474hLw2bd7rPYsfhoRxdQ7Y4TQmailsGyEFH3b6No9kL8EGca5yakdLi3iHuOJo-xYKhKhhFR3ZEA/file?c_luid=f3923c08", expected: 65088 },
  { key: "unique-products/mb-b650m.webp", url: "https://uc379dd4aeb78b3f98a0a1b78918.dl.dropboxusercontent.com/cd/0/get/DITDaAmsPh8PTUg185erTD_Zw-s1sHjFrbzv0mO7JVhrrgyjw6z8XWqUvaWW5TrbLHVXIoqOD4FyA8ieH3JSfKViLWDW9oNshVxwh_rWYsEXAXMMXNv3LzYbgPjDnCFehH2K_8tWdTPoubbpfgwlWVnpWY3nfPvz8AhX3yibBnHp9w/file?c_luid=f3923c08", expected: 63446 },
  { key: "unique-products/ram-64.webp", url: "https://ucc3015503e330b1d81b0a583520.dl.dropboxusercontent.com/cd/0/get/DIRusRX2qKRPQBQNHgZ8dTBfO7G-vefHxm6Sstm5NgCct_Si0xfF7dKHZ6rfRFUGBzgkvcZ1DVPhShFkRtTbXLpPwoFAEUzx2JKKhVrXd4UfY-gqMtaUF97jUaQez1ePA5lc7ZkjK02gSNfwnLjVVcTY-sbj2CD0w9fbnxdr2KSD-A/file?c_luid=f3923c08", expected: 47946 },
  { key: "unique-products/ram-32.webp", url: "https://uc89f5eb2fee6d87503c7f0d7bd7.dl.dropboxusercontent.com/cd/0/get/DIRmeab2-A0aokJdXlBWAi3qiv_yzpCUXeT1koofEUPeKXEHzInGToteKzSxngfOVpGNrsLPf7kZjSueaxALnV7ewQeIePHj8d6fjgfrfOVeRHAH7OmKqF4IdFUE314LNsQ2b1z5FDItWhGKHN6OZiaKSxy6sP2hO5M5Pkuw8nQuZw/file?c_luid=f3923c08", expected: 48648 },
  { key: "unique-products/ram-32-stealth.webp", url: "https://uc5c203a41854d4678becf817595.dl.dropboxusercontent.com/cd/0/get/DIRA8XFMQbAZfgtwjQ5kRpKXMsY--7kTFwj_F4kGn0YqrXGOq93tbSIwQeihnHhExjgCq_JdVOQ_sjdEMwwNoKNTKP9hD2ZSfkA-63jPBxO45DrchWFXu_QKWe581k4oqBy9r21J2nhME7sp32Ny18gLmfD_mg0TffPMI4UG_lTDmA/file?c_luid=f3923c08", expected: 41682 },
  { key: "unique-products/ssd-2tb.webp", url: "https://uc6213b58d92ac9525abf9d08c5e.dl.dropboxusercontent.com/cd/0/get/DIRnFUSiWfZYmb2tUgBmgOgoyQ7CzU1L7fwvCrqYsBTlB7kYePgh50opnTGT4JGl3zO7D7H5Ln0OeKmc-yFFYXgvk3gtfYbZ74_70Yvm0ZRz7hi3Bfj5omKxXxnd5_T4rwOR1ZNBQx4TEdr6s0kxiFAjthik1wAJmeWY6eayrY8Jhg/file?c_luid=f3923c08", expected: 219746 },
  { key: "unique-products/ssd-1tb.webp", url: "https://uce60c7440657d5f35f82b0e2f2a.dl.dropboxusercontent.com/cd/0/get/DIRHxIti01QN21ny_xYSaFBfcrRcwSf-9T66CMqr7RcQX7_9NUgJbtcSRpKM3xnK4Nb2pOmSGEiz21RVCVSyd2pbfE-mS-pK36kLq5mpggVUc2q0iudWdEkVkD6qj-xYDOJEirGO4AoI5AsdqM8wE-xhBrTZGu_-Vsiy64IZG0p76A/file?c_luid=f3923c08", expected: 215430 },
  { key: "unique-products/ssd-4tb.webp", url: "https://uc7d3ab7a5c0caa40d3280d02aa3.dl.dropboxusercontent.com/cd/0/get/DISOZyzdUfvD54ee0KuNndOn8g4tK3DHSG5lByle3YijcFiuCaD1TjnXY6Xdb4nOh_9Ln4djtJeURL5XDyLF2DKT1iimMp7WiO0WXhIRV7lKU7J4SFzBn7ZgyUXWHsr6_eNjM0EwLAnDKFXL_5wz83CgIvhSVVG4tpCzTaf_oc2mvA/file?c_luid=f3923c08", expected: 226818 },
  { key: "unique-products/case-mid.webp", url: "https://uccea66fd6de60d39ca6f8f8b286.dl.dropboxusercontent.com/cd/0/get/DITlk9JuLarM1msp_UiBlUrZb_c7EwT3EqiJWRGqDmUW93oyaxNA8T93CagUr5LLP6SBjcwUkncE0JUQYhU8GYFsC14Hp8SsA92RFlmjshl6PqswMGJyHgIi7IJucBdKftpWWIzwbbufdZeBJtSO-s9rxgmIQFnA1xGaCDrkaDlQHA/file?c_luid=f3923c08", expected: 262228 },
  { key: "unique-products/case-compact.webp", url: "https://uc3a0db143b6d35e16a62f2fa4ce.dl.dropboxusercontent.com/cd/0/get/DIT_nMxkoG4QVSQtOZ1mgGodEjU1hILms3Ek4IW9u4Xy4aqT5xXp0ebH3Emo9FcBvYyWXtQq3TKRqv56xSZaoNo9dciui3mUMw55KN-sQEn6DzgJCSbEx-AWfI4oc2OoniEdep0mpruvpL5YQM7CzKiq12xXqR71wb6-kl6PI0uHbA/file?c_luid=f3923c08", expected: 242852 },
  { key: "unique-products/case-show.webp", url: "https://uc57a9089beb7a809fddb7e84418.dl.dropboxusercontent.com/cd/0/get/DIS8ZyFo07mBShAenCIelkzUJqGjqYWlAcq6N_BNIaKzlKwnPdRTCXhbxOp1cwr_DX9LUEQH-RhqHGQoWBRlXcmiarED2TJ4s5AIEcDGWI0U6CkjoHt2F4O0pzLbOwoHJNWDlnqPzEwAffl6Ih6TT2haLkXI6NYFfpinRTRfYc1iuQ/file?c_luid=f3923c08", expected: 251384 },
  { key: "unique-products/monitor-180.webp", url: "https://uca561eec0d3815da588fdd0044a.dl.dropboxusercontent.com/cd/0/get/DITWy62PXbVPzM3VprHZiWlWf-KiLBLZ0H5xuvZ8xPI8R5AMDQv1RFsGoyfcYcGkWS8PdmHrKyCgFm9wmoho82RLrkeBh2oOQDWFhvEKMlDLjgzbpXkFuTjIXm99EXAg0MselYMNb8GQ07MGEy-ILda32ePGGVQtBrnCfTU_UBJMiA/file?c_luid=f3923c08", expected: 221136 },
  { key: "unique-products/monitor-240.webp", url: "https://ucef494378575c658ee85f369ed2.dl.dropboxusercontent.com/cd/0/get/DISIZQj13B3JUCgWFx0cNDQG0tT1wVkmHWvOXuycxEzzPDnLCHpdxY87ZkLEzE0h9bEZYvKKmawQvbByxpMhhwXsd_51CJHHlX_sLXt_egdIjKUGd-U36bJyMCDuHlSD4yqPTTgSNeaWLtxYycrywqjfWfRziW-mT2HDL1csEwOXgw/file?c_luid=f3923c08", expected: 222970 },
  { key: "unique-products/monitor-4k.webp", url: "https://uc45bb32ab25984f3f8c5c9a13f9.dl.dropboxusercontent.com/cd/0/get/DIR4vNt3T7ic--WIr0dNEKbwJ0QHBCjBMlGUj_OBSTMeMIRbh12cBWCsXQhLN0AuR4VLe-xauCQ9QRWrj0RwEq2KRWfgGSDR4FOGy4ae_baD_YqgE0HUj2g14cFDppoalN3TCCy9VEDxuBsmh-2dIfybp1e4_TA7VCi7Fb5gjWAzWA/file?c_luid=f3923c08", expected: 59080 },
  { key: "unique-products/cable-hdmi.webp", url: "https://uc35282680d0985d9b49c010e93d.dl.dropboxusercontent.com/cd/0/get/DIRr8clytGP6puNCtzzgk9r8Ld6VxXBCWK83fQn5xIUo-16wL2ue-uAi3KYMMVccGZBLa66LMxKpEoEc1hNRESwRd8Pb9ogUNUhLWB1fHFVlrMP-dNb0PP-aMKqe587rG2K8R1gxj1I340O_akwt7a2VfNAQJp6FfcaOQVoTGLnB7w/file?c_luid=f3923c08", expected: 233380 },
  { key: "unique-products/cable-dp.webp", url: "https://ucbd6a838675792d1a8457ba530d.dl.dropboxusercontent.com/cd/0/get/DISpEB9lPWiv-2yubxci_Fl70uqjwRSJTgWotF1yMRi806YUiFsJ-VpWtJESN5XurZ9VID1TsWjN25asS2iU1t5XDzbDiWTJO5B90W4WXK4mbwbt1TSb1QHx4UNIgN9PTZBOJbAiO7L6Ckj1YiK23yC_dYEOkP5B_wZG3ZxxVwx0eg/file?c_luid=f3923c08", expected: 247922 },
  { key: "unique-products/cable-kit.webp", url: "https://uc2bc9442375ccdce3eb02e9580c.dl.dropboxusercontent.com/cd/0/get/DIRgUtOG8sDkl4r5MiXPasM_uDYUhB6wLRVqAif_o7LswUel2tdH6OSOLFprmfkqwZqgX-eHKsvNi42ZN46jyoxqjPaoSelEDluuuee51o_c29PJj7qFhWvVepF1X21xmSknmdlY0cxwUa_ytCEtdPO8fYxSepJ_ItEXsYl-sLeauA/file?c_luid=f3923c08", expected: 239166 },
  { key: "unique-products/cooler-air.webp", url: "https://uc32d80b994d39898eaa121167fe.dl.dropboxusercontent.com/cd/0/get/DIROO4Ye5PfG2ugELIOcm1oYpPZTzKFajHVB981x7tlUQToP_NHZISYg_IJs0pHnlqRqBdjyC60mjB9jIlD5QDA7kt0wcTWMHtg7LCGtppVI3jh93NfDRhkZot19jXlMtuHpPXkWQiaL5IHtLplshrYBO70PtumqAGgXkji6GWLtjQ/file?c_luid=f3923c08", expected: 216532 },
  { key: "unique-products/cooler-aio240.webp", url: "https://uc46f384f0ba81525c678550787c.dl.dropboxusercontent.com/cd/0/get/DIRELACcXgN1Pgcgl9_yphuEhVtPqYOb8YPHiXI6fCob_TB0Rm9pt74cnFAoGY-w3s65bkZrQXvozkQPk4-lijGOGt6yKihWagkXdEZLpQ74zJmyx0nJ6GFdYfnzaELEl9eTWLKFhxcWTGziAhQVmeyortGlpj-JAphScUHJg_SDOw/file?c_luid=f3923c08", expected: 214658 },
  { key: "unique-products/cooler-aio360.webp", url: "https://uc186357c069feae18dec1469aac.dl.dropboxusercontent.com/cd/0/get/DITBwXd58c9X2Vs5h_nHLhfH7Wjr8CsEu3HEOQxsdiQChOTpBFciYzisI3CLZMTH37phpepkJ9GNkxa1_igBIJ4zlUMS-Otbc9_pod-T9F5AQlZeGtCRst9Ky2fcekhLYXLMr21x1zUPrMLof9PU8LTS4ATLYUX2mlkhJvdsza_HWg/file?c_luid=f3923c08", expected: 226846 },
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
