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
import { PropsWithChildren, useEffect, useState } from "react";
import Image from "next/image";
import CounterModule from "./countermodule";
import SampleImg from "./PIPA PVC.jpg";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseApp } from "@/libs/firebase/config";
import paths, { RedirectLoginPage } from "@/components/paths";
import { PromptAuth } from "@/components";
import LoginIcon from "@mui/icons-material/Login";
import { getAuth } from "firebase/auth";
import { useGeneralFunction } from "@/components/base/GeneralWrapper";
import CheckoutUI from "@/components/base/CheckoutUI";

export default function CartProductListsClient() {
  const { userManager } = useGeneralFunction();

  if (!userManager.currentUser)
    return (
      <PromptAuth
        message="Masuk untuk melihat keranjang anda!"
        icon={<LoginIcon className="text-[7.5rem]" />}
        redirectPath={paths.CARTS_ITEM_LIST}
      />
    );
  return (
    <>
      <div className="flex flex-col p-4 gap-8 sm:flex-row sm:gap-4 max-w-[1440px] mx-auto">
        <div className="flex-1">
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
        <Paper className="w-full sm:w-96 p-2" elevation={5}>
          <CheckoutUI productID="" />
        </Paper>
      </div>
    </>
  );
}
