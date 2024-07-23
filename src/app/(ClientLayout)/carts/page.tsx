import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Divider,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import styles from "@/scss/custom/CartList.module.scss";
import SITE_CONFIG from "@/components/config";
import { Metadata } from "next";
import { PropsWithChildren, useState } from "react";
import Image from "next/image";
import CounterModule from "./countermodule";
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
          <Typography gutterBottom>No items</Typography>
          <Card sx={{ display: "flex", minHeight: 151 }} elevation={5}>
            <Image
              src="https://e-katalog.lkpp.go.id/katalog/produk/download/gambar/966388583"
              alt="1"
              width={151}
              height={151}
            />
            <Box sx={{ flex: 1, padding: 3 }}>
              <Typography variant="h5">Pipa PVC</Typography>
              <Typography variant="caption">Rp 45.999</Typography>
              <CounterModule />
            </Box>
          </Card>
        </div>
        <Paper className={styles.FloatingPay} elevation={5}>
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
