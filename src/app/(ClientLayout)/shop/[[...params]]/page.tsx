import { Box, Button, Grid, Paper, styled, Typography } from "@mui/material";
import SITE_CONFIG from "@/components/config";
import { Metadata } from "next";
import ItemProductCard from "@/components/base/ProductCard";
import CSS from "@/scss/ShopPage.module.scss";
import dynamic from "next/dynamic";
import ProductList from "@/components/custom/ShopPage/FetchShopList";
export const metadata: Metadata = {
  title: `Belanja - ${SITE_CONFIG.SEO.Title}`,
};
const AdvancedFilterPopUp = dynamic(
  () => import("@/components/custom/ShopPage/AdvancedFilterPopUp"),
  {}
);
export default async function ShopPage(props: any) {
  return (
    <div className={CSS.ShopContainer}>
      <Typography variant="h4" gutterBottom>
        Selamat Berbelanja!
      </Typography>
      <AdvancedFilterPopUp />
      <Typography variant="h4" gutterBottom>
        Yang Terbaik!
      </Typography>
      <ProductList />
      <ItemProductCard />
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid xs={2} sm={4} md={4}></Grid>
      </Grid>
    </div>
  );
}
