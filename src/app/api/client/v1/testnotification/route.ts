import SendFCMNotification from "@/libs/api/sendFcmNotification";
import { ApiResponse } from "@/libs/axios";
import { ExtendedNotificationPayloadMain } from "@/libs/config";
import { AdminFirebaseMessaging } from "@/libs/firebase/adminConfig";
import { Notification } from "firebase-admin/messaging";
import { NotificationPayload } from "firebase/messaging";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("topic");
    const title = searchParams.get("noti_title");
    const custBody = searchParams.get("noti_body");
    const currentdate = new Date();
    const time =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " @ " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    const body: ExtendedNotificationPayloadMain = {
      title: title ?? "Notification Test!",
      body: custBody ?? `[${name}] Notifikasi dikirim pada tanggal ${time}`,
      image: `https://firebasestorage.googleapis.com/v0/b/moonsunstone-x.appspot.com/o/PublicContent%2FPhotoProfile%2Fp0t6dOm6ANg35Qx38pFLQn0OMgm1%2F1727160684.png?alt=media&token=861b1b7f-30cb-43c8-9af1-bdda21ba495a`,
    };
    const data = await SendFCMNotification(name ?? "", body);
    return NextResponse.json<ApiResponse>({
      code: 200,
      message: "OK",
      response: { data, expectedNotification: body },
    });
  } catch (e) {
    return NextResponse.json<ApiResponse>(
      {
        code: 500,
        message: "SERVER_ERROR",
        response: { error: e },
      },
      { status: 500 }
    );
  }
}
