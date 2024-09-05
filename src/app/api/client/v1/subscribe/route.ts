import { getMessaging } from "firebase-admin/messaging";
import { getAuth } from "firebase-admin/auth";
import { NextRequest, NextResponse } from "next/server";
import AdminFirebaseApp, {
  AdminFirebaseMessaging,
} from "@/libs/firebase/adminConfig";
import UserVerifyID from "@/libs/api/VerifyID";
import { ApiResponse } from "@/libs/axios";
import { GenerateFcmTopicName } from "@/libs/config";

export async function POST(request: NextRequest) {
  try {
    const requestJSON = await request.json();
    if (!requestJSON.authToken)
      return NextResponse.json<ApiResponse>(
        { code: 400, message: "INVALID_REQUEST" },
        { status: 400 }
      );

    const { IsValid, UserExists, uid } = await UserVerifyID(
      requestJSON.authToken
    );
    if (UserExists && IsValid) {
      const auth = getAuth(AdminFirebaseApp);
      if (!requestJSON.deviceFCMKey)
        return NextResponse.json<ApiResponse>(
          { code: 401, message: "INVALID_TOKEN" },
          { status: 401 }
        );
      const topicName = GenerateFcmTopicName(uid, requestJSON.deviceFCMKey);
      const { successCount } = await AdminFirebaseMessaging.subscribeToTopic(
        requestJSON.deviceFCMKey,
        "yesking"
      );

      return NextResponse.json<ApiResponse>({
        code: 200,
        message: "OK",
        response: {
          successCount,
        },
      });
    } else {
      return NextResponse.json<ApiResponse>(
        { code: 401, message: "INVALID_TOKEN" },
        { status: 401 }
      );
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json<ApiResponse>(
      { code: 400, message: "INVALID_REQUEST" },
      { status: 400 }
    );
  }
  //   const messaging = getMessaging(AdminFirebaseApp).subscribeToTopic();
}
