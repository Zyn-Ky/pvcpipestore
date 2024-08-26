"use client";
import paths from "@/components/paths";
import CSS from "@/scss/ShopPage.module.scss";
import { Box, Button, Collapse, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SidebarFilterModule() {
  const searchParam = useSearchParams();
  const isInFilterMode = Boolean(searchParam.get("fquery"));
  return (
    <>
      <Collapse
        className={CSS.Sidebar}
        in={isInFilterMode}
        orientation="horizontal"
        // style={{ width: isInFilterMode ? "260px" : "0px" }}
      >
        <Toolbar className="w-[260px]" />
        <Typography variant="h4" fontWeight="bold">
          Filter
        </Typography>
        {isInFilterMode && (
          <Button LinkComponent={Link} href={paths.ACTUAL_SHOP}>
            Hapus filter
          </Button>
        )}
      </Collapse>
    </>
  );
}
