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
    if (!requestJSON.deviceFCMKey)
      return NextResponse.json<ApiResponse>(
        { code: 401, message: "INVALID_TOKEN" },
        { status: 401 }
      );
    const fcmKey = requestJSON.deviceFCMKey;
    const topicUser =
      IsValid && UserExists ? GenerateFcmTopicName("USER", uid) : null;
    const topicGlobal = GenerateFcmTopicName("GLOBAL");
    const topicSystem = GenerateFcmTopicName("SYSTEM");
    const subscribedTopics = await Promise.all(
      [topicUser, topicGlobal, topicSystem]
        .filter((val) => val !== null)
        .map(async (topicName) => {
          if (!topicName) return;
          return {
            topicName,
            ...(await AdminFirebaseMessaging.subscribeToTopic(
              fcmKey,
              topicName
            )),
          };
        })
    );

    return NextResponse.json<ApiResponse>({
      code: 200,
      message: "OK",
      response: {
        subscribedTopics,
        fcmKey,
      },
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json<ApiResponse>(
      { code: 400, message: "INVALID_REQUEST" },
      { status: 400 }
    );
  }
  //   const messaging = getMessaging(AdminFirebaseApp).subscribeToTopic();
}
