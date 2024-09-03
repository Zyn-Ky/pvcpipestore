"use client";

import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, NoSsr, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useEffectOnce } from "react-use";
import { useLogger } from "../hooks/logger";
const Snackbar = dynamic(() => import("@mui/material/Snackbar"));
export default function WordpressMigration() {
  const param = useSearchParams();
  const [open, setOpen] = useState(false);
  const [forceClose, setForceClose] = useState(false);
  const { Console } = useLogger();
  useEffectOnce(() => {
    if (typeof window !== "object") return;
    Console(
      "log",
      window.document.referrer,
      window.document.referrer.indexOf("https://belajarjualan.com/pipapvc") !==
        -1
    );
    setOpen(
      window.document.referrer.indexOf("https://belajarjualan.com/pipapvc") !==
        -1
    );
  });
  return (
    <>
      <NoSsr>
        <Snackbar
          open={
            !forceClose
              ? open || param.get("sc_path") === "WORDPRESS_OLD_SITE_REDIRECT"
              : false
          }
          onClose={() => {
            setForceClose(true);
          }}
          message={
            <>
              <Typography variant="h6">
                Selamat datang ke situs yang ditingkatkan dan lebih optimal!
              </Typography>
            </>
          }
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => {
                setForceClose(true);
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </NoSsr>
    </>
  );
}
