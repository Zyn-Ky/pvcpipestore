"use client";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  styled,
  Typography,
} from "@mui/material";
import Image from "next/image";
import TempImage from "./download.png";
import { ProductCardInfo } from "@/libs/config";
import dynamic from "next/dynamic";
import { PhotoProvider } from "react-photo-view";
import Link from "next/link";
import { GetProductUrl } from "../paths";
const PhotoView = dynamic(
  async () => (await import("react-photo-view")).PhotoView,
  { ssr: false }
);
const QueenCard = styled(Card)(({ theme }) => ({
  margin: 16,
  userSelect: "text",
  width: 250,
  marginBottom: "20px",
  border: "1px solid #ccc",
  padding: "20px",
  textAlign: "center",
}));

export default function ItemProductCard(props: { data: ProductCardInfo }) {
  const IMAGE_SIZE = 200;
  return (
    <Link
      href={GetProductUrl(
        props.data.ProductID,
        {
          key: "ref",
          value: "PRODUCT_CARD",
        },
        { key: "param", value: "test" },
        { key: "param1", value: "test " }
      )}
    >
      <QueenCard variant="outlined">
        <Image
          src={props.data.Images?.[0] ?? ""}
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
          alt="Placeholder"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.data.Name ?? ""}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rp. {props.data.Price ?? ""}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" variant="contained">
            Tambah ke Keranjang
          </Button>
          <Button size="small">Beli</Button>
        </CardActions>
      </QueenCard>
    </Link>
  );
}
