import { getAuth } from "firebase-admin/auth";
import { NextRequest, NextResponse } from "next/server";
import AdminFirebaseApp from "@/libs/firebase/adminConfig";
import UserVerifyID from "@/libs/api/VerifyID";
import { ApiResponse } from "@/libs/axios";

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
      const currentUser = await auth.getUser(uid);
      if (currentUser.email !== "er12345.ky@gmail.com")
        return NextResponse.json(
          { code: 403, message: "USER_NOT_SUPERUSER_APPROVED" },
          { status: 403 }
        );

      await auth.setCustomUserClaims(uid, {
        userRole: "ACTIVE_SELLER",
      });
      return NextResponse.json<ApiResponse>({
        code: 200,
        message: "OK",
      });
    } else {
      return NextResponse.json<ApiResponse>(
        { code: 401, message: "INVALID_TOKEN" },
        { status: 401 }
      );
    }
  } catch {
    return NextResponse.json<ApiResponse>(
      { code: 400, message: "INVALID_REQUEST" },
      { status: 400 }
    );
  }
}
