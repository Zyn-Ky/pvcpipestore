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
const QueenCard = styled(Card)(({ theme }) => ({
  margin: 16,
  userSelect: "text",
}));

export default function ItemProductCard() {
  return (
    <>
      <QueenCard variant="outlined">
        <Image src={TempImage} width={350} height={350} alt="Placeholder" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Cap PVC Rucika AW 100mm (4″)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fitting Pipa PVC Standard JIS, CAP
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rp. 52.300
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
