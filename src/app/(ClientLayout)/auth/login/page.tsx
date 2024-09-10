import CSS from "@/scss/AuthUISharedLayout.module.scss";

import { Button, Typography } from "@mui/material";
import Link from "next/link";
import paths from "@/components/paths";
import { Metadata } from "next";
import SITE_CONFIG from "@/components/config";
import LoginClient from "./LoginModule";
export const metadata: Metadata = {
  title: `Login`,
};
export default function LoginUI() {
  return (
    <>
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight="bold"
        component="h1"
      >
        Masuk
      </Typography>
      <LoginClient />
      <Typography>
        Belum mempunyai akun?
        <Link href={paths.AUTH_REGISTER}>
          <Typography color="lightblue">Daftar sekarang!</Typography>
        </Link>
      </Typography>
    </>
  );
}
