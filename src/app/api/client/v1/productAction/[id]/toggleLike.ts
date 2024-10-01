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

export interface ProductActionLikedAPIResponse
  extends ProductActionAPIResponse {
  response?: {
    currentState: boolean;
  };
}

export default async function ToggleLikeProduct(
  request: NextRequest,
  jsonReq: ProductActionRequest,
  { params }: { params: { id?: string; [key: string]: any } },
  liked?: boolean
) {
  if (!params.id)
    return NextResponse.json<ProductActionLikedAPIResponse>(
      {
        code: 400,
        message: "BAD_REQUEST",
      },
      { status: 400 }
    );
  console.log(request);
  const { IsValid, UserExists, uid } = await UserVerifyID(
    jsonReq.authToken ?? ""
  );
  let Username = "Unknown";
  let Image = undefined;
  if (IsValid && UserExists) {
    const productRawRequest = AdminFirebaseStore.collection(
      SITE_BACKEND_CONFIG.FIRESTORE_PRODUCT_ROOT_PATH
    ).doc(`${params.id}`);
    const productRawInfo = await productRawRequest.get();
    const productRawData = productRawInfo.data() as StoredProductCardInfo;
    if (!productRawData.LinkedUser)
      return NextResponse.json<ProductActionLikedAPIResponse>(
        {
          code: 500,
          message: "INVALID_PRODUCT_DETAIL",
        },
        { status: 500 }
      );

    const userInfo = await AdminFirebaseAuth.getUser(uid);
    if (userInfo.displayName) {
      Username = userInfo.displayName;
      Image = userInfo.photoURL;
    }
    const CurrentLiked =
      Array.isArray(productRawData.LikedByUID) && productRawData.LikedByUID
        ? [...productRawData.LikedByUID]
        : [];
    const isToggleMode = typeof liked === "undefined";
    const IsAlreadyLiked = CurrentLiked.includes(uid);
    const WithoutLiked = CurrentLiked.filter((val) => val !== uid);
    const toggleState = IsAlreadyLiked ? WithoutLiked : [...CurrentLiked, uid];
    const likeState = IsAlreadyLiked ? CurrentLiked : [...CurrentLiked, uid];
    const unlikeState = IsAlreadyLiked ? WithoutLiked : CurrentLiked;

    const updatedBody = {
      ...productRawData,
      LikedByUID: isToggleMode ? toggleState : liked ? likeState : unlikeState,
    } as StoredProductCardInfo;
    console.log({
      isToggleMode,
      IsAlreadyLiked,
      WithoutLiked,
      toggleState,
      likeState,
      unlikeState,
      updatedBody,
    });
    productRawRequest.update(updatedBody as any);
    if (liked === true) {
      const fcmTopic = GenerateFcmTopicName("USER", productRawData.LinkedUser);
      await SendFCMNotification(fcmTopic, {
        title: `${Username} has liked your product!`,
        image: Image ?? "",
        subIcon: "RED_LOVE_ICON",
      });
    }
    return NextResponse.json<ProductActionLikedAPIResponse>({
      code: 200,
      message: "OK",
      response: {
        currentState: updatedBody.LikedByUID
          ? updatedBody.LikedByUID.includes(uid)
          : false,
      },
    });
  }
  return NextResponse.json<ProductActionLikedAPIResponse>(
    {
      code: 403,
      message: "FORBIDDEN_ACTION",
    },
    { status: 403 }
  );
}
