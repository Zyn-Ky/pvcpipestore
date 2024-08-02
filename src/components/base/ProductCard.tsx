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
    <PhotoProvider maskOpacity={0.8}>
      <QueenCard variant="outlined">
        <PhotoView
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
          render={({ scale, attrs }) => {
            const width = parseFloat((attrs?.style?.width ?? 0).toString());
            const offset = (width - IMAGE_SIZE) / IMAGE_SIZE;
            const childScale = scale === 1 ? scale + offset : 1 + offset;
            return (
              <div {...attrs}>
                <Image
                  src={props.data.Images?.[0] ?? ""}
                  width={IMAGE_SIZE}
                  height={IMAGE_SIZE}
                  style={{
                    transform: `scale(${childScale})`,
                    width: IMAGE_SIZE,
                    height: IMAGE_SIZE,
                  }}
                  alt="Placeholder"
                />
              </div>
            );
          }}
        >
          <Image
            src={props.data.Images?.[0] ?? ""}
            width={IMAGE_SIZE}
            height={IMAGE_SIZE}
            alt="Placeholder"
          />
        </PhotoView>

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
    </PhotoProvider>
  );
}
