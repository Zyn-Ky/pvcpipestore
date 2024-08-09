"use client";
import CSS from "@/scss/ProductItem.module.scss";
import { Typography } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={CSS.ProductNotFoundContainer}>
      <div className={CSS.Child}>
        <SentimentVeryDissatisfiedIcon className={CSS.Icon} />
        <Typography variant="h2" fontWeight="bold">
          Barang tidak ditemukan!
        </Typography>
      </div>
    </div>
  );
}
