"use client";
import { useGeneralFunction } from "@/components/base/GeneralWrapper";
import InfiniteCircularProgress from "@/components/InfiniteCircularProgress";
import { LegacySWRFetcher, SWRFetcher } from "@/libs/axios";
import { useEffect, useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export default function ShippingCostTest() {
  const { apiManager } = useGeneralFunction();
  const {
    data: provinceASelectorList,
    error: provinceASelectorError,
    isLoading: provinceASelectorLoading,
  } = useSWR(
    "client/v1/shipping?mode=lookup",
    LegacySWRFetcher(apiManager.xsrfToken, { method: "GET" })
  );
  const {
    data: cityASelectorList,
    error: cityASelectorError,
    isMutating: cityASelectorLoading,
    trigger: cityASelectorTrigger,
    reset: cityASelectorReset,
  } = useSWRMutation(
    "client/v1/shipping",
    SWRFetcher<{ mode?: string }>(apiManager.xsrfToken, {
      method: "GET",
      defaultArg: {
        mode: "lookup",
      },
    })
  );

  const {
    data: provinceBSelectorList,
    error: provinceBSelectorError,
    isMutating: provinceBSelectorLoading,
    trigger: provinceBSelectorTrigger,
    reset: provinceBSelectorReset,
  } = useSWRMutation(
    "client/v1/shipping",
    SWRFetcher<{ mode?: string }>(apiManager.xsrfToken, {
      method: "GET",
      defaultArg: {
        mode: "lookup",
      },
    })
  );
  const {
    data: cityBSelectorList,
    error: cityBSelectorError,
    isMutating: cityBSelectorLoading,
    trigger: cityBSelectorTrigger,
    reset: cityBSelectorReset,
  } = useSWRMutation(
    "client/v1/shipping",
    SWRFetcher<{ mode?: string; province?: string }>(apiManager.xsrfToken, {
      method: "GET",
      defaultArg: {
        mode: "lookup",
      },
    })
  );
  const {
    data: CostData,
    error: CostDataError,
    isMutating: CostDataLoading,
    trigger: CostDataTrigger,
    reset: CostDataReset,
  } = useSWRMutation(
    "client/v1/shipping",
    SWRFetcher<{
      mode?: string;
      cityA?: string;
      cityB?: string;
      weight?: string;
      courier?: string;
    }>(apiManager.xsrfToken, {
      method: "GET",
      defaultArg: {
        mode: "cost",
        weight: "500",
      },
    })
  );
  const [cityAValue, setCityAValue] = useState("DEFAULT");
  const [provinceAValue, setProvinceAValue] = useState("DEFAULT");
  const [provinceBValue, setProvinceBValue] = useState("DEFAULT");
  const [cityBValue, setCityBValue] = useState("DEFAULT");
  const [courierValue, setCourierValue] = useState("DEFAULT");
  const isLoading =
    provinceASelectorLoading ||
    cityASelectorLoading ||
    provinceBSelectorLoading ||
    cityBSelectorLoading ||
    CostDataLoading;
  const error =
    provinceASelectorError ||
    cityASelectorError ||
    provinceBSelectorError ||
    cityBSelectorError ||
    CostDataError;
  //   useEffect(() => {});
  if (isLoading) return <InfiniteCircularProgress />;
  const TotalCost =
    CostData &&
    CostData.data &&
    CostData.data.response &&
    CostData.data.response.json &&
    CostData.data.response.json.rajaongkir &&
    CostData.data.response.json.rajaongkir.results;
  return (
    <>
      <p>Dari</p>
      {provinceASelectorList &&
        provinceASelectorList.data &&
        provinceASelectorList.data.response &&
        provinceASelectorList.data.response.results && (
          <>
            <select
              value={provinceAValue}
              onChange={(e) => {
                if (e.currentTarget.value === "DEFAULT") {
                  cityASelectorReset();
                  return;
                }
                cityASelectorTrigger({
                  province: e.currentTarget.value ?? "0",
                });
                setProvinceAValue(e.currentTarget.value ?? "0");
              }}
            >
              <option value="DEFAULT" selected>
                Pilih provinsi
              </option>
              {provinceASelectorList.data.response.results.map((val: any) => (
                <option
                  value={`${val.province_id}`}
                  key={`PROVINCE_A_${val.province_id}`}
                >
                  {val.province}
                </option>
              ))}
            </select>
          </>
        )}
      {cityASelectorList &&
        cityASelectorList.data &&
        cityASelectorList.data.response &&
        cityASelectorList.data.response.results && (
          <>
            <select
              value={cityAValue}
              onChange={(e) => {
                console.log(e);
                setCityAValue(e.currentTarget.value);
                if (e.currentTarget.value === "DEFAULT")
                  provinceBSelectorReset();
                if (e.currentTarget.value !== "DEFAULT")
                  provinceBSelectorTrigger();
              }}
            >
              <option value="DEFAULT" selected>
                Pilih kota
              </option>
              {cityASelectorList.data.response.results.map((val: any) => (
                <option value={`${val.city_id}`} key={`CITY_A_${val.city_id}`}>
                  {val.type}
                  &nbsp;{val.city_name}
                </option>
              ))}
            </select>
          </>
        )}
      {cityAValue !== "DEFAULT" && (
        <>
          <p>Tujuan</p>
          {provinceBSelectorList &&
            provinceBSelectorList.data &&
            provinceBSelectorList.data.response &&
            provinceBSelectorList.data.response.results && (
              <>
                <select
                  value={provinceBValue}
                  onChange={(e) => {
                    if (e.currentTarget.value === "DEFAULT") {
                      cityBSelectorReset();
                      return;
                    }
                    cityBSelectorTrigger({
                      province: e.currentTarget.value ?? "0",
                    });
                    setProvinceBValue(e.currentTarget.value ?? "0");
                  }}
                >
                  <option value="DEFAULT" selected>
                    Pilih provinsi
                  </option>
                  {provinceBSelectorList.data.response.results.map(
                    (val: any) => (
                      <option
                        value={`${val.province_id}`}
                        key={`PROVINCE_B_${val.province_id}`}
                      >
                        {val.province}
                      </option>
                    )
                  )}
                </select>
              </>
            )}
          {cityBSelectorList &&
            cityBSelectorList.data &&
            cityBSelectorList.data.response &&
            cityBSelectorList.data.response.results && (
              <>
                <select
                  value={cityBValue}
                  onChange={(e) => {
                    console.log(e);
                    setCityBValue(e.currentTarget.value ?? "0");
                  }}
                >
                  <option value="DEFAULT" selected>
                    Pilih kota
                  </option>
                  {cityBSelectorList.data.response.results.map((val: any) => (
                    <option
                      value={`${val.city_id}`}
                      key={`CITY_A_${val.city_id}`}
                    >
                      {val.type}
                      &nbsp;
                      {val.city_name}
                    </option>
                  ))}
                </select>
              </>
            )}
        </>
      )}
      {cityBValue !== "DEFAULT" && (
        <>
          <p>Pilih Kurir</p>
          <select
            value={courierValue}
            onChange={(e) => {
              console.log(e);
              setCourierValue(e.currentTarget.value ?? "0");
              CostDataReset();
              if (e.currentTarget.value !== "DEFAULT")
                CostDataTrigger({
                  cityA: cityAValue,
                  cityB: cityBValue,
                  courier: e.currentTarget.value,
                });
            }}
          >
            <option value="DEFAULT" selected>
              Pilih Kurir
            </option>
            {["jne", "pos", "tiki"].map((val) => (
              <option value={`${val}`} key={`COURIER_${val}`}>
                {val.toUpperCase()}
              </option>
            ))}
          </select>
        </>
      )}
      {TotalCost && (
        <>
          <p>Harga Ongkir</p>
          {TotalCost[0].code && <p>Kode : {TotalCost[0].code}</p>}
          {TotalCost[0].name && <p>Nama : {TotalCost[0].name}</p>}
          {TotalCost[0].costs &&
            TotalCost[0].costs.map((val: any) => (
              <>
                <br />
                <p>
                  {val.service && val.service}:&nbsp;
                  {val.description && val.description}: <br />
                  {val.cost[0].etd && val.cost[0].etd + " hari"}:{" "}
                  {val.cost[0].value &&
                    new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(val.cost[0].value ?? 0)}
                </p>
              </>
            ))}
        </>
      )}
    </>
  );
}
