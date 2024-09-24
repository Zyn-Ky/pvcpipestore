import { ApiResponse } from "@/libs/axios";
import { AcceptedCurrency } from "@/libs/config";
import { NextRequest, NextResponse } from "next/server";

export interface ProductTotalLookupRequest {
  authToken?: string;
  productIDs: string[];
}

export interface ProductTotalLookupResponse {
  currency: AcceptedCurrency;
  serviceTax: number;
  productPriceTotalCost: number;
  products: { id: string; price: number }[];
  shipping: {
    type: string;
    cost: number;
  };
  totalPrice: number;
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
        productPriceTotalCost: 0,
        products: [{ id: "", price: 0 }],
        serviceTax: 2000,
        currency: "IDR",
        shipping: {
          cost: 0,
          type: "unknown",
        },
        totalPrice: 2000,
      },
      nextAction: "CAN_CONTINUE_TO_NEXT_STEP",
    });
  } catch {
    return NextResponse.json<ProductTotalLookupAPIResponse>({
      code: 400,
      message: "INVALID_REQUEST",
    });
  }
}
