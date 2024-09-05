import { ApiResponse } from "@/libs/axios";
import { AdminFirebaseMessaging } from "@/libs/firebase/adminConfig";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("TOPIC_NAME");
  const data = await AdminFirebaseMessaging.send({
    topic: "/topics/" + name ?? "",
    notification: {
      title: "Test",
      body: `Nopalppr pprrrrrr TIME=${Math.floor(Date.now() / 1000)}`,
    },
  });
  return NextResponse.json<ApiResponse>({
    code: 200,
    message: "OK",
    response: { data },
  });
}
