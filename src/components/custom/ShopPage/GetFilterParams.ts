export function GetFilterSearchParams(
  params: { [key: string]: string | string[] | undefined },
  paramKey: string
) {
  if (!params[paramKey])
    return {
      exists: false,
      array: [],
    };
  const isParamArray = Array.isArray(typeof params[paramKey]);
  const isParamString = typeof params[paramKey] === "string";
  const exists = isParamArray
    ? Boolean(params[paramKey])
    : isParamString
    ? params[paramKey]?.length < 1
    : false;
  const array = isParamArray
    ? params[paramKey][0].split(",")
    : isParamString
    ? (params[paramKey] as string).split(",")
    : [];
  return {
    exists,
    array,
    // array: array && array[0]?.split("=")[1].split(","),
  };
}

export default function GetFilterParams(
  params: { params?: string[] },
  paramKey: string
) {
  if (!params.params)
    return {
      exists: false,
      array: [],
    };
  const array = params.params
    .map((e) => decodeURIComponent(e))
    .filter((e) => e.split("=")[0] === paramKey);
  return {
    exists: array.length > 0,
    array: array && array[0]?.split("=")[1].split(","),
  };
}
