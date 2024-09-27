import SITE_CONFIG from "@/components/config";
import paths from "@/components/paths";
import IsComingSoonSSR from "@/libs/firebase/comingSoonChecker";
import { Metadata } from "next";
import Link from "next/link";
import RegisterClient from "./RegisterModule";
import { Typography } from "@mui/material";
export const metadata: Metadata = {
  title: `Daftar`,
};
export default async function RegisterUI() {
  if (await IsComingSoonSSR())
    return (
      <>
        <iframe className="fullscreen_cmp_w_navbar" src="/cmp.html" />
      </>
    );
  return (
    <>
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight="bold"
        component="h1"
      >
        Daftar
      </Typography>
      <RegisterClient />
      <p>
        Sudah mempunyai akun?
        <Link href={paths.AUTH_LOGIN}>Login disini</Link>
      </p>
    </>
  );
}
