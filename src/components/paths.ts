const paths = {
  HOME_PAGE: "/",
  MOBILE_NOTIFICATION: "/mobile-notification",
  ACTUAL_SHOP: "/shop",
  PRODUCT_INFO: "/product",
  CARTS_ITEM_LIST: "/carts",
  TRANSACTION_LIST: "/transactions",
  MOBILE_MY_ACCOUNT: "/mb-my-account",
  AUTH_LOGIN: "/auth/login",
  AUTH_REGISTER: "/auth/register",
  SETTINGS_PAGE: "/set-prefs",
  CONTACT_PAGE: "/support-form",
  CHECKOUT_PAGE: "/sp-checkout",
};

export function RedirectLoginPage(url: string) {
  return `${paths.AUTH_LOGIN}?next=${url}`;
}
export function RedirectRegisterPage(url: string) {
  return `${paths.AUTH_REGISTER}?next=${url}`;
}
export function GetProductUrl(
  id: string,
  ...parameter: { key: string; value: string }[]
) {
  return `${paths.PRODUCT_INFO}/${id}${parameter && "?"}${
    parameter &&
    parameter
      .map(
        ({ key, value }, i) =>
          `${key}=${value}${parameter.length - 1 !== i ? "&" : ""}`
      )
      .join("")
  }`;
}

export function GenerateShopFilterUrl({ filterID }: { filterID?: number[] }) {
  return `${paths.ACTUAL_SHOP}${filterID && `?fquery=${filterID.join(",")}`}`;
}

export default paths;
