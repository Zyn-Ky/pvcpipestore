import CSS from "@/scss/ProductItem.module.scss";
import UserSummaryModule from "./UserSummaryModule";
import { Breadcrumbs, Button, Link, Typography } from "@mui/material";
import { IsDisabledOnProduction } from "@/components/base/ProtectedHiddenDevComponent";
import HorizontalActionModule from "./HorizontalActionModule";
import ImageModule from "./ImageModule";
import { ProductCardInfo } from "@/libs/config";
import paths, { GenerateShopFilterUrl } from "@/components/paths";
import NextLink from "next/link";
export default function ProductRenderer({
  productItem,
  productID,
}: {
  productItem: ProductCardInfo;
  productID: string;
}) {
  return (
    <main className={CSS.ProductContainer}>
      <div className={CSS.ImgProduct}>
        <ImageModule
          productItem={{
            ...productItem,
            ProductID: productID ?? "",
          }}
        />
      </div>
      <div className={CSS.ProductInfo}>
        {productItem.ResolvedCatalogID && (
          <Breadcrumbs className="mb-4">
            <Link
              underline="hover"
              color="inherit"
              href={paths.ACTUAL_SHOP}
              component={NextLink}
            >
              Shop
            </Link>
            {productItem.ResolvedCatalogID.map(
              (id, i) =>
                id && (
                  <Link
                    underline="hover"
                    color="inherit"
                    href={GenerateShopFilterUrl({
                      filterID: [id.SelfID],
                    })}
                    component={NextLink}
                    key={i}
                  >
                    {id.Title}
                  </Link>
                )
            )}
            <Link underline="hover" color="text.primary" aria-current="page">
              {productItem.Name && productItem.Name}
            </Link>
          </Breadcrumbs>
        )}
        <Typography variant="h4" fontWeight="bold">
          {productItem.Name && productItem.Name}
        </Typography>
        <Typography variant="h5" fontWeight="bold">
          {new Intl.NumberFormat("id-ID", {
            currency: productItem.SuggestedCurrency ?? "",
            style: "currency",
          }).format(productItem.Price ?? 0)}
        </Typography>
        <HorizontalActionModule />
        <Typography
          variant="body1"
          paragraph
          dangerouslySetInnerHTML={{
            __html: productItem.Description ?? "",
          }}
        />
        <br />

        <Button
          variant="contained"
          className="mr-4"
          LinkComponent={NextLink}
          href={`${paths.CHECKOUT_PAGE}?direct_buy_id=${productItem.ProductID}`}
        >
          Beli
        </Button>
        <Button variant="outlined" disabled={IsDisabledOnProduction()}>
          Tambahkan ke Keranjang
        </Button>
        <br />
      </div>
      <UserSummaryModule userInfo={productItem.ResolvedPublisherInfo} />
    </main>
  );
}