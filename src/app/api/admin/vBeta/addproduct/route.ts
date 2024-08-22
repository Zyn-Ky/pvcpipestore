import { getAuth } from "firebase-admin/auth";
import { NextRequest, NextResponse } from "next/server";
import AdminFirebaseApp from "@/libs/firebase/adminConfig";
import UserVerifyID from "@/libs/api/VerifyID";
import { ApiResponse } from "@/libs/axios";
import { getFirestore } from "firebase-admin/firestore";
import CheckCloudinaryStatus from "@/libs/api/CheckCloudinaryStatus";
import SITE_BACKEND_CONFIG, { API_PATH } from "@/libs/config";
import IsActiveSeller from "@/libs/api/IsActiveSeller";

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
    const isActiveSeller = await IsActiveSeller(requestJSON.authToken);
    if (isActiveSeller) {
      const auth = getAuth(AdminFirebaseApp);
      const currentUser = await auth.getUser(uid);
      if (currentUser.email !== "er12345.ky@gmail.com")
        return NextResponse.json<ApiResponse>(
          { code: 403, message: "USER_NOT_SUPERUSER_APPROVED" },
          { status: 403 }
        );

      if (requestJSON.condition === "checkImageServerStatus") {
        const { ok } = await CheckCloudinaryStatus();
        if (ok)
          return NextResponse.json<ApiResponse>({
            code: 200,
            message: "OK",
            response: {
              use: "CLOUDINARY",
              apiPath: API_PATH.IMAGE_UPLOAD_SERVER,
            },
            nextAction: "CONTINUE_IMAGE_UPLOAD",
          });
        return NextResponse.json<ApiResponse>({
          code: 500,
          message: "UPLOAD_SERVER_BUSY",
          response: {},
          nextAction: "HALT_IMAGE_UPLOAD",
        });
      }
      if (requestJSON.condition === "postnewproduct") {
        return NextResponse.json<ApiResponse>({
          code: 302,
          message: "REDIRECT_CLIENT_ACTION",
          nextAction: "USE_CLIENT_SDK",
          response: {},
        });
      }
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
