"use client";

import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, NoSsr, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useEffectOnce } from "react-use";
import { useLogger } from "../hooks/logger";
import { enqueueSnackbar } from "notistack";
const Snackbar = dynamic(() => import("@mui/material/Snackbar"));
export default function WordpressMigration() {
  const param = useSearchParams();
  useEffectOnce(() => {
    if (typeof window !== "object") return;
    if (param.get("sc_path") === "WORDPRESS_OLD_SITE_REDIRECT")
      enqueueSnackbar(
        <>
          <Typography variant="h6" component="p">
            Selamat datang ke situs yang ditingkatkan dan lebih optimal!
          </Typography>
        </>
      );
  });
  return <></>;
}
