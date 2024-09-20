"use client";
import { useGeneralFunction } from "@/components/base/GeneralWrapper";
import { Button } from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";

export default function ForceViewPostButton({ uid }: { uid: string }) {
  const { userManager } = useGeneralFunction();
  const router = useRouter();
  return (
    userManager.currentUser?.uid === uid && (
      <Button
        LinkComponent={"a"}
        href="?force_view_article_for_approved_users=1"
        onClick={async (e) => {
          e.preventDefault();
          router.push(
            `?force_view_article_for_approved_users=1&_token=${await userManager.currentUser?.getIdToken()}`
          );
        }}
      >
        Lihat artikel
      </Button>
    )
  );
}
