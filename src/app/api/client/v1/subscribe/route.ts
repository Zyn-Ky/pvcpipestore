import { getMessaging } from "firebase-admin/messaging";
import { getAuth } from "firebase-admin/auth";
import { NextRequest, NextResponse } from "next/server";
import AdminFirebaseApp from "@/libs/firebase/adminConfig";
import UserVerifyID from "@/libs/api/VerifyID";

export async function POST(request: NextRequest) {
  try {
    const requestJSON = await request.json();
    if (!requestJSON.authToken)
      return NextResponse.json(
        { code: 400, message: "INVALID_REQUEST" },
        { status: 400 }
      );

    const { IsValid, UserExists, uid } = await UserVerifyID(
      requestJSON.authToken
    );
    if (UserExists && IsValid) {
      const auth = getAuth(AdminFirebaseApp);
      return NextResponse.json({
        code: 200,
        message: "OK",
        auth: await auth.getUser(uid),
      });
    } else {
      return NextResponse.json(
        { code: 401, message: "INVALID_TOKEN" },
        { status: 401 }
      );
    }
  } catch {
    return NextResponse.json(
      { code: 400, message: "INVALID_REQUEST" },
      { status: 400 }
    );
  }
  //   const messaging = getMessaging(AdminFirebaseApp).subscribeToTopic();
}
