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

const QueenCard = styled(Card)(({ theme }) => ({
  margin: 16,
}));

export default function ItemProductCard() {
  return (
    <>
      <QueenCard variant="outlined">
        <Image
          src="https://mui.com/static/images/cards/contemplative-reptile.jpg"
          width={350}
          height={140}
          alt="Placeholder"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lorem Ipsum
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus ducimus officia, amet repellendus atque ipsa error
            maxime corporis quia fuga placeat porro nesciunt est quam expedita
            eveniet. Qui, modi itaque?
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
