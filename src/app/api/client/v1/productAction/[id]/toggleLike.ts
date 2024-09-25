import SendFCMNotification from "@/libs/api/sendFcmNotification";
import { ProductActionAPIResponse, ProductActionRequest } from "./route";
import { NextRequest, NextResponse } from "next/server";
import {
  AdminFirebaseAuth,
  AdminFirebaseStore,
} from "@/libs/firebase/adminConfig";
import SITE_BACKEND_CONFIG, {
  GenerateFcmTopicName,
  StoredProductCardInfo,
} from "@/libs/config";
import UserVerifyID from "@/libs/api/VerifyID";

export default async function ToggleLikeProduct(
  request: NextRequest,
  jsonReq: ProductActionRequest,
  { params }: { params: { id?: string; [key: string]: any } }
) {
  if (!params.id)
    return NextResponse.json<ProductActionAPIResponse>(
      {
        code: 400,
        message: "BAD_REQUEST",
      },
      { status: 400 }
    );
  console.log(request);
  const productRawInfo = await AdminFirebaseStore.doc(
    `${SITE_BACKEND_CONFIG.FIRESTORE_PRODUCT_ROOT_PATH}${params.id}`
  ).get();
  const productRawData = productRawInfo.data() as StoredProductCardInfo;
  if (!productRawData.LinkedUser)
    return NextResponse.json<ProductActionAPIResponse>(
      {
        code: 500,
        message: "INVALID_PRODUCT_DETAIL",
      },
      { status: 500 }
    );
  const { IsValid, UserExists, uid } = await UserVerifyID(
    jsonReq.authToken ?? ""
  );
  let Username = "Unknown";
  let Image = undefined;
  if (IsValid && UserExists) {
    const userInfo = await AdminFirebaseAuth.getUser(uid);
    if (userInfo.displayName) {
      Username = userInfo.displayName;
      Image = userInfo.photoURL;
    }
  }
  const fcmTopic = GenerateFcmTopicName("USER", productRawData.LinkedUser);

  const notificationMsgPath = await SendFCMNotification(fcmTopic, {
    title: `${Username} has liked your product!`,
    image: Image ?? "",
    subIcon: "RED_LOVE_ICON",
  });
  return NextResponse.json<ProductActionAPIResponse>({
    code: 200,
    message: "OK",
    response: {
      fcmNotificationDetail: notificationMsgPath,
      reqData: jsonReq,
    },
  });
}
