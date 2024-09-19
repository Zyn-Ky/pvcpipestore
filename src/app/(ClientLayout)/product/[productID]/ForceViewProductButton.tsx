"use client";

import { useGeneralFunction } from "@/components/base/GeneralWrapper";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForceViewProductButton() {
  const { userManager } = useGeneralFunction();
  const router = useRouter();
  return (
    userManager.currentUser && (
      <Button
        LinkComponent={Link}
        href="?ref=ERROR_PROMPT&force_view_product_for_approved_users=1"
        onClick={async (e) => {
          e.preventDefault();
          if (userManager.currentUser)
            router.push(
              `?ref=ERROR_PROMPT&force_view_product_for_approved_users=1&_token=${await userManager.currentUser.getIdToken()}`
            );
        }}
      >
        Lihat produk
      </Button>
    )
  );
}
