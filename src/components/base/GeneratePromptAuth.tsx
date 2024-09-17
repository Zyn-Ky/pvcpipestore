"use client";
import { ReactNode } from "react";
import CSS from "@/scss/custom/GeneratePromptAuth.module.scss";
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import { RedirectLoginPage } from "../paths";
import { useTranslations } from "next-intl";
import { useGeneralFunction } from "./GeneralWrapper";
import InfiniteCircularProgress from "../InfiniteCircularProgress";

export default function PromptAuth(props: {
  message: ReactNode;
  redirectPath?: string;
  icon?: ReactNode;
  disableLoginButton?: boolean;
  actions?: ReactNode;
}) {
  const t = useTranslations("BASE");
  const { userManager } = useGeneralFunction();
  return (
    <>
      <div className={CSS.Outer}>
        {userManager.loading && <InfiniteCircularProgress />}
        {!userManager.loading && (
          <>
            {props.icon && props.icon}
            <Typography variant="h5" fontWeight="bold" my={4}>
              {props.message && props.message}
            </Typography>
            {!props.disableLoginButton && (
              <Link href={RedirectLoginPage(props.redirectPath ?? "/")}>
                <Button variant="contained" size="large">
                  {t("LOGIN_TEXT")}
                </Button>
              </Link>
            )}
            {props.actions && props.actions}
          </>
        )}
      </div>
    </>
  );
}
