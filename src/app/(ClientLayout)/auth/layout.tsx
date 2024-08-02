import { AuthUISharedLayout_Benefit_id_ID } from "@/components/assets/images";
import CSS from "@/scss/AuthUISharedLayout.module.scss";
import { Paper } from "@mui/material";
import Image from "next/image";

export default function AuthUISharedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className={CSS.AuthContainer}>
        <Paper className={CSS.BannerIntro} elevation={12}>
          <Image
            src={AuthUISharedLayout_Benefit_id_ID}
            sizes="100vw"
            className={CSS.Img}
            alt="Banner Benefit Mempunyai Akun"
          />
        </Paper>
        <Paper className={CSS.OuterFormContainer} elevation={12}>
          {children}
        </Paper>
      </div>
    </>
  );
}
