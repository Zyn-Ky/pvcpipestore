import CSS from "@/scss/AuthUISharedLayout.module.scss";

import { Button } from "@mui/material";
import Link from "next/link";
import paths from "@/components/paths";
import { Metadata } from "next";
import SITE_CONFIG from "@/components/config";
import LoginClient from "./LoginModule";
export const metadata: Metadata = {
  title: `Masuk - ${SITE_CONFIG.SEO.Title}`,
};
export default function LoginUI() {
  return (
    <>
      <h1>Login</h1>
      <LoginClient />
      <p>
        Belum mempunyai akun?
        <Link href={paths.AUTH_REGISTER}>Daftar sekarang!</Link>
      </p>
    </>
  );
}
