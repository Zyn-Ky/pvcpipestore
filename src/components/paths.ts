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
  SETTINGS_ACCOUNT_PAGE: "/set-prefs/account",
  SETTINGS_THEME_PAGE: "/set-prefs/mb-themes",
  SETTINGS_LANGUAGE_PAGE: "/set-prefs/language",
  SETTINGS_ADDRESS_PAGE: "/set-prefs/address-perf",
  SETTINGS_PAYMENT_PAGE: "/set-prefs/payments-mode",
  CONTACT_PAGE: "/help/support",
  ARTICLE_PAGE: "/help/articles",
  CHECKOUT_PAGE: "/sp-checkout",
  SELLER_ADMIN_PAGE: "/admin",
  POST_PRODUCT_ADMIN_PAGE: "/admin/post",
  FEEDBACKS_LIST_ADMIN_PAGE: "/admin/feedbacks",
  PRODUCTS_LIST_ADMIN_PAGE: "/admin/products",
  PRODUCT_ITEM_ADMIN_PAGE: "/admin/products/",
  STATIC_TOS_TEXT: "/static/tos-text/",
  STATIC_PP_TEXT: "/static/pp-text/",
};
export const BTM_NAVIGATION_ENABLED_PATHS = [
  paths.ACTUAL_SHOP,
  paths.MOBILE_NOTIFICATION,
  paths.CARTS_ITEM_LIST,
  paths.MOBILE_MY_ACCOUNT,
];
export function GetAdminProductUrl(id: string) {
  return `${paths.PRODUCT_ITEM_ADMIN_PAGE}${id}`;
}
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

export function GeneratePostURL(id: string, absolute?: boolean) {
  return `${paths.ARTICLE_PAGE}/${id}`;
}
export function GenerateTosPage(locale: string) {
  return `${paths.STATIC_TOS_TEXT}${locale}-tos.html`;
}
export function GeneratePpPage(locale: string) {
  return `${paths.STATIC_PP_TEXT}${locale}-pp.html`;
}

export default paths;
