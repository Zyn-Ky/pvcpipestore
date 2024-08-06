import { ReactNode } from "react";
import CSS from "@/scss/custom/GeneratePromptAuth.module.scss";
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import { RedirectLoginPage } from "../paths";

export default function PromptAuth(props: {
  message: ReactNode;
  redirectPath: string;
  icon?: ReactNode;
}) {
  return (
    <>
      <div className={CSS.Outer}>
        {props.icon && props.icon}
        <Typography variant="h5" fontWeight="bold" my={4}>
          {props.message && props.message}
        </Typography>
        <Link href={RedirectLoginPage(props.redirectPath ?? "/")}>
          <Button variant="contained" size="large">
            Masuk
          </Button>
        </Link>
      </div>
    </>
  );
}
