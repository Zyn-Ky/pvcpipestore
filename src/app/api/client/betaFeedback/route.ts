import UserVerifyID from "@/libs/api/VerifyID";
import { ApiResponse } from "@/libs/axios";
import SITE_BACKEND_CONFIG, { StoredFeedbackInfo } from "@/libs/config";
import AdminFirebaseApp from "@/libs/firebase/adminConfig";
import { getFirestore } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const requestJSON = await request.json();
  const requiredKey = [
    "DebugJSLog",
    "Description",
    "Email",
    "Title",
    "FormType",
    "LinkedUID",
    "SystemDevInfo",
  ];
  const valid = requiredKey.every((key) =>
    Object.keys(requestJSON).includes(key)
  );
  if (!valid)
    return NextResponse.json<ApiResponse>(
      { code: 400, message: "INVALID_REQUEST" },
      { status: 400 }
    );
  let UID: StoredFeedbackInfo["LinkedUID"] = "Unknown";
  if (
    (requestJSON.LinkedUID === "Unknown" && requestJSON.authToken) ||
    (requestJSON.LinkedUID === "Anonymous" && requestJSON.authToken) ||
    requestJSON.authToken
  ) {
    const { IsValid, UserExists, uid } = await UserVerifyID(
      requestJSON.authToken
    );
    if (IsValid && UserExists) {
      UID = uid;
    } else {
      return NextResponse.json<ApiResponse>(
        { code: 400, message: "INVALID_REQUEST" },
        { status: 400 }
      );
    }
  }

  const data: StoredFeedbackInfo = {
    DebugJSLog: requestJSON.DebugJSLog ?? "{}",
    IPAddress:
      request.ip ||
      request.headers.get("X-Forwarded-For") ||
      request.headers.get("x-real-ip") ||
      "N/A",
    Description: (requestJSON.Description as string) ?? "",
    Email: (requestJSON.Email as string) ?? "",
    Title: (requestJSON.Title as string) ?? "",
    FormType:
      (requestJSON.FormType as string) === "SUPPORT_FORM"
        ? "SUPPORT_FORM"
        : "BETA_FORM",
    LinkedUID: UID,
    SystemDevInfo: requestJSON.SystemDevInfo ?? "{}",
  };
  const db = getFirestore(AdminFirebaseApp);
  const collection = db.collection(
    SITE_BACKEND_CONFIG.FIRESTORE_FEEDBACKS_ROOT_PATH
  );
  if (!collection)
    return NextResponse.json<ApiResponse>(
      {
        code: 500,
        message: "SERVER_BUSY",
      },
      { status: 500 }
    );
  try {
    const submitedData = await (await collection.add(data)).get();
    return NextResponse.json<ApiResponse>(
      {
        code: 200,
        message: "OK",
        nextAction:
          UID === "Unknown" || UID === "Anonymous"
            ? "SUGGEST_LOGIN"
            : "VIEW_FEEDBACK_LOG",
        response: { submitedData },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json<ApiResponse>(
      {
        code: 500,
        message: "SERVER_BUSY",
      },
      { status: 500 }
    );
  }
}
