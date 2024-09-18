"use client";
import paths from "@/components/paths";
import { ListItemButton, useMediaQuery, useTheme } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

export default function ActiveSidebarButton({
  href,
  children,
}: PropsWithChildren<{ href: string }>) {
  const pathname = usePathname();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <ListItemButton
      LinkComponent={Link}
      href={href}
      selected={
        href === paths.SETTINGS_ACCOUNT_PAGE && !isSmallScreen
          ? pathname === paths.SETTINGS_PAGE ||
            pathname === paths.SETTINGS_ACCOUNT_PAGE
          : href === pathname
      }
      dense={!isSmallScreen}
    >
      {children && children}
    </ListItemButton>
  );
}
