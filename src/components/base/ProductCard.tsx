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
  return (
    <>
      <QueenCard variant="outlined">
        <Image
          src={props.data.Images?.[0] ?? ""}
          width={200}
          height={200}
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
    </>
  );
}
