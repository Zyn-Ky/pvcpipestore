import { Box, Button, Divider, Paper, styled, Typography } from "@mui/material";
import styles from "@/scss/custom/CartList.module.scss";
import SITE_CONFIG from "@/components/config";
import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: `Keranjang - ${SITE_CONFIG.SEO.Title}`,
};

function TextLR(props: PropsWithChildren<{ rightItem?: string }>) {
  return (
    <>
      <div className={styles.TextLR}>
        <div className={styles.Left}>{props.children && props.children}</div>
        <div className={styles.Right}>{props.rightItem && props.rightItem}</div>
      </div>
    </>
  );
}

export default function CartsItemList() {
  return (
    <>
      <div className={styles.WrapperList}>
        <div className={styles.ItemListing}>
          <Typography>No items</Typography>
        </div>
        <Paper className={styles.FloatingPay}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Summary
          </Typography>
          <TextLR rightItem="Rp. 99.999">Item Total</TextLR>
          <TextLR rightItem="Rp. 1.500">Services</TextLR>
          <TextLR rightItem="FREE">Shipping Fee</TextLR>
          <Divider sx={{ mb: 1 }} />
          <TextLR rightItem="Rp. 101.499">Total</TextLR>
          <Button variant="contained" fullWidth>
            Checkout
          </Button>
        </Paper>
      </div>
    </>
  );
}
