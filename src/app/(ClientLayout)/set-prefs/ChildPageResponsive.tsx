"use client";

import paths from "@/components/paths";
import { useMediaQuery, useTheme } from "@mui/material";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

export default function ChildPageResponsive(props: PropsWithChildren) {
  const theme = useTheme();
  const pathname = usePathname();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      {isSmallScreen
        ? pathname !== paths.SETTINGS_PAGE && props.children
        : props.children}
    </>
  );
}
