import { Box, Button, Grid, Paper, styled, Typography } from "@mui/material";
import SITE_CONFIG from "@/components/config";
import { Metadata } from "next";
import ItemProductCard from "@/components/base/ProductCard";
import AdvancedFilterPopUp from "@/components/custom/ShopPage/AdvancedFilterPopUp";
export const metadata: Metadata = {
  title: `Belanja - ${SITE_CONFIG.SEO.Title}`,
};

export default function ShopPage(props: any) {
  return (
    <div>
      <AdvancedFilterPopUp />
      {JSON.stringify(props)}
      <Typography variant="h4" gutterBottom>
        Best of the Week!
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {Array.from(Array(10)).map((_, index) => (
          <Grid xs={2} sm={4} md={4} key={index}>
            <ItemProductCard />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
