"use client";
import CSS from "@/scss/ShopPage.module.scss";
import { InfoRounded } from "@mui/icons-material";
import { Button, ButtonBase, Paper, SvgIcon, Typography } from "@mui/material";
import HighlightedButton from "./CustomHighlightedButton";
import {
  PipaElbowIcon,
  PipaPipaIcon,
  PipaTeeIcon,
  PipaYBranchIcon,
} from "@/components/assets/icons";
import Link from "next/link";
import { GenerateShopFilterUrl } from "@/components/paths";

export default function ContentCategoryModule() {
  return (
    <>
      <Typography variant="h3" fontWeight="bold">
        Kategori
      </Typography>
      <div className={CSS.HeaderCategoryList}>
        <div className={CSS.HorizontalCategory}>
          {[
            [
              "Fitting Pipa PVC Standard JIS",
              <PipaTeeIcon fill="currentColor" fontSize="large" key={1} />,
            ],
            [
              "Fitting pipa uPVC SNI dan Limbah",
              <PipaElbowIcon fill="currentColor" fontSize="large" key={2} />,
            ],
            [
              "Pipa PVC",
              <PipaPipaIcon fill="currentColor" fontSize="large" key={3} />,
            ],
            [
              "Y Branch (PVC)",
              <PipaYBranchIcon fill="currentColor" fontSize="large" key={4} />,
            ],
          ].map((item, i) => (
            <Paper key={i} elevation={2}>
              <Button
                LinkComponent={Link}
                href={GenerateShopFilterUrl({ filterID: [1324, 4234] })}
                className={CSS.CategoryItem}
                component={"a"}
                sx={{ color: (theme) => theme.palette.text.primary }}
              >
                <div className={CSS.CategoryItemIcon} color="currentColor">
                  {item[1]}
                </div>
                <Typography textAlign="left">{item[0]}</Typography>
              </Button>
            </Paper>
          ))}
        </div>
      </div>
    </>
  );
}
