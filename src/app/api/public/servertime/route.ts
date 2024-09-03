import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return new Response(Math.round(+new Date() / 1000).toString(), {
    status: 200,
  });
}
