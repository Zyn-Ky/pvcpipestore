"use client";
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
import CSS from "@/scss/custom/CartList.module.scss";
import { PropsWithChildren, useEffect, useState } from "react";
import Image from "next/image";
import CounterModule from "./countermodule";
import SampleImg from "./PIPA PVC.jpg";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseApp, FirebaseAuth } from "@/libs/firebase/config";
import paths, { RedirectLoginPage } from "@/components/paths";
import { PromptAuth } from "@/components";
import LoginIcon from "@mui/icons-material/Login";
function TextLR(props: PropsWithChildren<{ rightItem?: string }>) {
  return (
    <>
      <div className={CSS.TextLR}>
        <div className={CSS.Left}>{props.children && props.children}</div>
        <div className={CSS.Right}>{props.rightItem && props.rightItem}</div>
      </div>
    </>
  );
}

export function CartsClient() {
  const [ClientUserInfo, ClientUserInfoLoading, ClientUserInfoError] =
    useAuthState(FirebaseAuth);

  if (!ClientUserInfo)
    return (
      <PromptAuth
        message="Masuk untuk melihat keranjang anda!"
        icon={<LoginIcon className="text-[7.5rem]" />}
        redirectPath={paths.CARTS_ITEM_LIST}
      />
    );
  return (
    <>
      <div className={CSS.WrapperList}>
        <div className={CSS.ItemListing}>
          <Typography gutterBottom>No items</Typography>
          <Card className="flex min-h-[151px]" elevation={5}>
            <Image src={SampleImg} alt="1" width={151} height={151} />
            <Box className="flex-1 p-12">
              <Typography variant="h5">Pipa PVC</Typography>
              <Typography variant="caption">Rp 45.999</Typography>
              <br />
              <CounterModule />
            </Box>
          </Card>
        </div>
        <Paper className={CSS.FloatingPay} elevation={5}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Summary
          </Typography>
          <TextLR rightItem="Rp. 99.999">Item Total</TextLR>
          <TextLR rightItem="Rp. 1.500">Services</TextLR>
          <TextLR rightItem="FREE">Shipping Fee</TextLR>
          <Divider className="mb-4" />
          <TextLR rightItem="Rp. 101.499">Total</TextLR>
          <Button variant="contained" fullWidth>
            Checkout
          </Button>
        </Paper>
      </div>
    </>
  );
}
