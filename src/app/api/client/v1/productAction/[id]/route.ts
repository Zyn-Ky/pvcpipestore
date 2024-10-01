import SendFCMNotification from "@/libs/api/sendFcmNotification";
import { ApiResponse } from "@/libs/axios";
import { NextRequest, NextResponse } from "next/server";
import ToggleLikeProduct from "./toggleLike";

type ProductActions =
  | "REMOVE_FROM_USER_FAVORITE"
  | "ADD_TO_USER_FAVORITE"
  | "TOGGLE_FAVORITE_STATUS";

export interface ProductActionRequest {
  authToken: string;
  action: ProductActions;
}
export interface ProductActionResponse {}

export type ProductActionAPIResponse = ApiResponse<ProductActionResponse>;

export async function POST(
  request: NextRequest,
  { params }: { params: { [key: string]: any } }
) {
  const reqData = (await request.json()) as ProductActionRequest;
  if (reqData.action === "TOGGLE_FAVORITE_STATUS")
    return await ToggleLikeProduct(request, reqData, { params }, undefined);
  if (reqData.action === "ADD_TO_USER_FAVORITE")
    return await ToggleLikeProduct(request, reqData, { params }, true);
  if (reqData.action === "REMOVE_FROM_USER_FAVORITE")
    return await ToggleLikeProduct(request, reqData, { params }, false);
  return NextResponse.json<ProductActionAPIResponse>(
    {
      code: 400,
      message: "INVALID_REQUEST",
    },
    { status: 400 }
  );
}
