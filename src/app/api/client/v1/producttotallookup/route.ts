import { ApiResponse } from "@/libs/axios";
import { AcceptedCurrency } from "@/libs/config";
import { NextRequest, NextResponse } from "next/server";

export interface ProductTotalLookupRequest {
  authToken?: string;
  productIDs: string[];
}

export interface ProductTotalLookupResponse {
  currency: AcceptedCurrency;
}

export type ProductTotalLookupAPIResponse =
  ApiResponse<ProductTotalLookupResponse>;

export async function POST(request: NextRequest) {
  try {
    const data: ProductTotalLookupRequest = await request.json();
    return NextResponse.json<ProductTotalLookupAPIResponse>({
      code: 200,
      message: "OK",
      response: {
        currency: "IDR",
      },
    });
  } catch {
    return NextResponse.json<ProductTotalLookupAPIResponse>({
      code: 400,
      message: "INVALID_REQUEST",
    });
  }
}
