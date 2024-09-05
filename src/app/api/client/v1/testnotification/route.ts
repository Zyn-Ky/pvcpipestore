import { ApiResponse } from "@/libs/axios";
import { AdminFirebaseMessaging } from "@/libs/firebase/adminConfig";
import { Notification } from "firebase-admin/messaging";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("TOPIC_NAME");
  const body: Notification = {
    title: "Test",
    body: `Nopalppr pprrrrrr TIME=${Math.floor(Date.now() / 1000)}`,
  };
  const data = await AdminFirebaseMessaging.send({
    topic: "/topics/" + name ?? "",
    notification: body,
  });
  return NextResponse.json<ApiResponse>({
    code: 200,
    message: "OK",
    response: { data, expectedNotification: body },
  });
}
