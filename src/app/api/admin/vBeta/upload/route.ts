import UploadToCloudinary from "@/libs/api/UploadToCloudinary";
import UserVerifyID from "@/libs/api/VerifyID";
import { ApiResponse } from "@/libs/axios";
import AdminFirebaseApp from "@/libs/firebase/adminConfig";
import { getAuth } from "firebase-admin/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    if (
      !formData.get("secAuthToken") ||
      typeof formData.get("secAuthToken") !== "string"
    )
      return NextResponse.json(
        { code: 400, message: "INVALID_REQUEST" },
        { status: 400 }
      );

    const { IsValid, UserExists, uid } = await UserVerifyID(
      (formData.get("secAuthToken") ?? "").toString()
    );
    if (UserExists && IsValid) {
      const auth = getAuth(AdminFirebaseApp);
      const currentUser = await auth.getUser(uid);
      // if (currentUser.email !== "")
      //   return NextResponse.json(
      //     { code: 403, message: "USER_NOT_SUPERUSER_APPROVED" },
      //     { status: 403 }
      //   );
      const folderPathname = formData.get("pathname") as string | null;
      const imageFile = formData.get("image_binary") as File | null;
      if (!folderPathname)
        return NextResponse.json(
          { code: 400, message: "INVALID_REQUEST" },
          { status: 400 }
        );
      if (!imageFile)
        return NextResponse.json(
          { code: 400, message: "INVALID_REQUEST" },
          { status: 400 }
        );
      if (imageFile.type.indexOf("image/") === -1)
        return NextResponse.json(
          { code: 400, message: "INVALID_FILE_FORMAT" },
          { status: 400 }
        );
      const uploaded = await UploadToCloudinary(folderPathname, imageFile);
      return NextResponse.json<ApiResponse>({
        code: 200,
        message: "OK",
        response: uploaded,
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
