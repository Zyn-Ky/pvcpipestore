import { ApiResponse } from "@/libs/axios";
import { TotalCost } from "@/libs/rajaongkir";
import { NextRequest, NextResponse } from "next/server";
interface ShippingInfoResponse {}

export type ShippingInfoApiResponse = ApiResponse<ShippingInfoResponse>;

export async function GET(request: NextRequest) {
  return NextResponse.json<ApiResponse>(
    {
      code: 403,
      message: "FORBIDDEN_FOR_PRODUCTION",
    },
    { status: 403 }
  );
  // try {
  //   const url = new URL(request.url);
  //   const ApiKey = process.env.SECURED_RAJAONGKIR_KEY;
  //   if (!ApiKey)
  //     return NextResponse.json<ApiResponse>(
  //       { code: 500, message: "INVALID_CONFIGURATION" },
  //       { status: 500 }
  //     );
  //   const mode = url.searchParams.get("mode");

  //   if (mode === "lookup") {
  //     const provinceID = url.searchParams.get("province");

  //     const provinceRequest = await fetch(
  //       "https://api.rajaongkir.com/starter/province",
  //       {
  //         method: "GET",
  //         headers: {
  //           Key: ApiKey,
  //         },
  //       }
  //     );

  //     const cityRequest = await fetch(
  //       `https://api.rajaongkir.com/starter/city${
  //         provinceID ? `?province=${provinceID}` : ""
  //       }`,
  //       {
  //         method: "GET",

  //         headers: {
  //           Key: ApiKey,
  //         },
  //       }
  //     );
  //     const provinceJson = await provinceRequest.json();
  //     const cityJson = await cityRequest.json();

  //     return NextResponse.json<ApiResponse>({
  //       code: 200,
  //       message: "OK",
  //       response: provinceID ? cityJson.rajaongkir : provinceJson.rajaongkir,
  //     });
  //   }
  //   if (mode === "cost") {
  //     const cityA = url.searchParams.get("cityA");
  //     const cityB = url.searchParams.get("cityB");
  //     const weight = url.searchParams.get("weight");
  //     const courier = url.searchParams.get("courier");
  //     if (!cityA || !cityB || !weight || !courier)
  //       return NextResponse.json<ApiResponse>({
  //         code: 400,
  //         message: "BAD_REQUEST",
  //       });
  //     const formData = new FormData();
  //     formData.append("origin", cityA);
  //     formData.append("destination", cityB);
  //     formData.append("weight", weight);
  //     formData.append("courier", courier);
  //     const rawRequest = await fetch(
  //       "https://api.rajaongkir.com/starter/cost",
  //       {
  //         method: "POST",
  //         body: formData,
  //         headers: {
  //           Key: ApiKey,
  //         },
  //       }
  //     );
  //     const json = await rawRequest.json();
  //     return NextResponse.json<ApiResponse>({
  //       code: 200,
  //       message: "OK",
  //       response: { json },
  //     });
  //   }
  //   return NextResponse.json<ApiResponse>({
  //     code: 400,
  //     message: "BAD_REQUEST",
  //   });
  // } catch {
  //   return NextResponse.json<ApiResponse>(
  //     { code: 500, message: "SERVER_ERROR" },
  //     { status: 500 }
  //   );
  // }
}

export async function POST(request: NextRequest) {
  // window.caches.open();
  return NextResponse.json({});
}
