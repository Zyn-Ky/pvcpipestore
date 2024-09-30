type StarterAccountSupportedCourier = "tiki" | "jne" | "pos";

interface RawRajaongkirCostSuccessApiResponse {
  rajaongkir: {
    query?: {
      origin: string;
      destination: string;
      weight: number;
      courier: StarterAccountSupportedCourier;
    };
    status: {
      code: number;
      description: string;
    };
    origin_details?: {
      city_id: string;
      province_id: string;
      province: string;
      type: string;
      city_name: string;
      postal_code: string;
    };
    destination_details?: {
      city_id: string;
      province_id: string;
      province: string;
      type: string;
      city_name: string;
      postal_code: string;
    };
    results?: {
      code: string;
      name: string;
      costs: {
        service: string;
        description: string;
        cost: {
          value: number;
          etd: string;
          note: string;
        }[];
      }[];
    }[];
  };
}

interface RawRajaongkirCostFailedApiResponse {
  rajaongkir: {
    status: {
      code: number;
      description: string;
    };
  };
}

interface RawRajaongkirCitySuccessApiResponse {
  rajaongkir: {
    query?: {
      province: string;
      id: string;
    };
    status: {
      code: number;
      description: string;
    };
    results?: {
      city_id: string;
      province_id: string;
      province: string;
      type: string;
      city_name: string;
      postal_code: string;
    }[];
  };
}
interface RawRajaongkirCityFailedApiResponse {
  rajaongkir: {
    status: {
      code: number;
      description: string;
    };
  };
}

interface RawRajaongkirProvinceSuccessApiResponse {
  rajaongkir: {
    query?: {
      id: string;
    };
    status: {
      code: number;
      description: string;
    };
    results?: {
      province_id: string;
      province: string;
    }[];
  };
}
interface RawRajaongkirProvinceFailedApiResponse {
  rajaongkir: {
    status: {
      code: number;
      description: string;
    };
  };
}

type RawRajaongkirCostApiResponse = RawRajaongkirCostSuccessApiResponse &
  RawRajaongkirCostFailedApiResponse;

type RawRajaongkirCityApiResponse = RawRajaongkirCitySuccessApiResponse &
  RawRajaongkirCityFailedApiResponse;

type RawRajaongkirProvinceApiResponse =
  RawRajaongkirProvinceSuccessApiResponse &
    RawRajaongkirProvinceFailedApiResponse;

const API_RAJAONGKIR_PATHS = {
  starter: {
    City: "https://api.rajaongkir.com/starter/city",
    Cost: "https://api.rajaongkir.com/starter/cost",
    Province: "https://api.rajaongkir.com/starter/province",
  },
};

export async function GetProvincesIDList({
  provinceID,
}: {
  provinceID?: string;
}) {
  try {
    const ApiKey = process.env.SECURED_RAJAONGKIR_KEY || "MISSING";

    const rawRequest = await fetch(
      `${API_RAJAONGKIR_PATHS.starter.Province}?${new URLSearchParams({
        id: provinceID ?? "",
      }).toString()}`,
      {
        method: "GET",
        headers: {
          Key: ApiKey,
        },
      }
    );
    const { rajaongkir } =
      (await rawRequest.json()) as RawRajaongkirProvinceApiResponse;
    return {
      status: rajaongkir.status,
      id: rajaongkir.query?.id,
      provincesList:
        rajaongkir.results &&
        rajaongkir.results.map(({ province, province_id }) => ({
          name: province,
          id: province_id,
        })),
    };
  } catch (e) {
    return { status: { code: 500, message: JSON.stringify(e) } };
  }
}

export async function GetCitiesIDList({
  cityID,
  provinceID,
}: {
  provinceID?: string;
  cityID?: string;
}) {
  try {
    const ApiKey = process.env.SECURED_RAJAONGKIR_KEY || "MISSING";

    const rawRequest = await fetch(
      `${API_RAJAONGKIR_PATHS.starter.City}?${new URLSearchParams({
        provinceID: provinceID ?? "",
        cityID: cityID ?? "",
      }).toString()}`,
      {
        method: "GET",
        headers: {
          Key: ApiKey,
        },
      }
    );
    const { rajaongkir } =
      (await rawRequest.json()) as RawRajaongkirCityApiResponse;
    return {
      status: rajaongkir.status,
      cityID: rajaongkir.query?.id,
      provinceID: rajaongkir.query?.province,
      citiesList:
        rajaongkir.results &&
        rajaongkir.results.map(
          ({
            city_id,
            city_name,
            postal_code,
            province,
            province_id,
            type,
          }) => ({
            suffixType: type,
            postalCode: postal_code,
            id: city_id,
            name: city_name,
            provinceName: province,
            provinceID: province_id,
          })
        ),
    };
  } catch (e) {
    return { status: { code: 500, message: JSON.stringify(e) } };
  }
}

export async function TotalCost(
  fromCityID: string,
  toCityID: string,
  courier: StarterAccountSupportedCourier,
  weightInGrams: string
) {
  try {
    const ApiKey = process.env.SECURED_RAJAONGKIR_KEY || "MISSING";
    const formData = new FormData();
    formData.append("origin", fromCityID);
    formData.append("destination", toCityID);
    formData.append("weight", weightInGrams);
    formData.append("courier", courier);
    const rawRequest = await fetch(API_RAJAONGKIR_PATHS.starter.Cost, {
      method: "POST",
      body: formData,
      headers: {
        Key: ApiKey,
      },
    });
    const { rajaongkir } =
      (await rawRequest.json()) as RawRajaongkirCostApiResponse;

    return {
      status: rajaongkir.status,
      origin: rajaongkir.origin_details,
      destination: rajaongkir.destination_details,
      availableCourier:
        rajaongkir.results &&
        rajaongkir.results.map((value) => ({
          codename: value.code,
          name: value.name,
          availableShippingMethods: value.costs.map(
            ({ cost, description, service }) => ({
              serviceName: service,
              description,
              cost,
            })
          ),
        })),
    };
  } catch (e) {
    return { status: { code: 500, message: JSON.stringify(e) } };
  }
}
