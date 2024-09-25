import SendFCMNotification from "@/libs/api/sendFcmNotification";
import { ApiResponse } from "@/libs/axios";
import { NextRequest, NextResponse } from "next/server";
import ToggleLikeProduct from "./toggleLike";

type ProductActions = "ADD_TO_USER_FAVORITES_LIST";

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
  console.log(params);
  if (reqData.action === "ADD_TO_USER_FAVORITES_LIST")
    return await ToggleLikeProduct(request, reqData, { params });
  return NextResponse.json<ProductActionAPIResponse>(
    {
      code: 400,
      message: "INVALID_REQUEST",
    },
    { status: 400 }
  );
}
