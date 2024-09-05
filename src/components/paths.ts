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
  CONTACT_PAGE: "/help/support",
  ARTICLE_PAGE: "/help/articles",
  CHECKOUT_PAGE: "/sp-checkout",
  SELLER_ADMIN_PAGE: "/admin",
  POST_PRODUCT_ADMIN_PAGE: "/admin/post",
  FEEDBACKS_LIST_ADMIN_PAGE: "/admin/feedbacks",
  PRODUCTS_LIST_ADMIN_PAGE: "/admin/products",
  PRODUCT_ITEM_ADMIN_PAGE: "/admin/products/",
};
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

export default paths;
