"use server";
import { AuthUISharedLayout_Benefit_id_ID } from "@/components/assets/images";
import ResponsivePopup from "@/components/custom/AuthUISharedLayout/ResponsivePopup";
import CSS from "@/scss/AuthUISharedLayout.module.scss";
import { Paper } from "@mui/material";
import Image from "next/image";

export default async function AuthUISharedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className={CSS.AuthContainer}>
        <Paper
          className={CSS.BannerIntro + " hidden muiSm:block"}
          elevation={12}
        >
          <Image
            src={AuthUISharedLayout_Benefit_id_ID}
            sizes="100vw"
            className={CSS.Img}
            alt="Banner Benefit Mempunyai Akun"
          />
        </Paper>
        <ResponsivePopup>{children}</ResponsivePopup>
      </div>
    </>
  );
}
