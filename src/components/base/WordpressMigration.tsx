"use client";

import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, NoSsr, Snackbar, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function WordpressMigration() {
  const param = useSearchParams();
  const [open, setOpen] = useState(() => {
    if (typeof window !== "object") return false;
    console.log(
      window.document.referrer,
      window.document.referrer.indexOf("https://www.google.com") !== -1
    );
    // return window.refferer.indexOf("https://belajarjualan.com/pipapvc") !== -1;
    return window.document.referrer.indexOf("https://www.google.com") !== -1;
  });
  const [forceClose, setForceClose] = useState(false);
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
