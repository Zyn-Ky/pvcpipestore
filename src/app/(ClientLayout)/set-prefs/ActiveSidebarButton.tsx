"use client";
import { ListItemButton } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

export default function ActiveSidebarButton({
  href,
  children,
}: PropsWithChildren<{ href: string }>) {
  const pathname = usePathname();

  return (
    <ListItemButton
      LinkComponent={Link}
      href={href}
      selected={href === pathname}
    >
      {children && children}
    </ListItemButton>
  );
}
