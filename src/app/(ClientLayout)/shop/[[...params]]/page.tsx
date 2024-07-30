import { Box, Button, Grid, Paper, styled, Typography } from "@mui/material";
import SITE_CONFIG from "@/components/config";
import { Metadata } from "next";
import ItemProductCard from "@/components/base/ProductCard";
import AdvancedFilterPopUp from "@/components/custom/ShopPage/AdvancedFilterPopUp";
import CSS from "@/scss/ShopPage.module.scss";
export const metadata: Metadata = {
  title: `Belanja - ${SITE_CONFIG.SEO.Title}`,
};

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
      <ItemProductCard />
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid xs={2} sm={4} md={4}></Grid>
      </Grid>
      <br />
      <br />
      <hr />
      <br />
      <p>Props</p>
      {JSON.stringify(props)}
      <br />
      <br />
      <hr />
      <br />
      <p>Test API</p>
      {JSON.stringify(
        await (
          await fetch(
            `https://jsonplaceholder.typicode.com/comments?postId=${Math.floor(
              Math.random() * (100 - 1 + 1) + 1
            )}`
          )
        ).json()
      )}
    </div>
  );
}
