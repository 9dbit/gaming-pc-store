import { NextResponse } from "next/server";

export const runtime = "nodejs";

function notFound() {
  return NextResponse.json({ error: "not found" }, { status: 404 });
}

export async function GET() { return notFound(); }
export async function POST() { return notFound(); }
export async function PUT() { return notFound(); }
export async function PATCH() { return notFound(); }
export async function DELETE() { return notFound(); }
