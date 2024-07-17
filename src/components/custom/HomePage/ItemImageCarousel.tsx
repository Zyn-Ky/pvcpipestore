import { Button, Paper } from "@mui/material";
import { ContainerItemTextCarousel } from "./HeroBox";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import dynamic from "next/dynamic";
type ItemImageCarousel = {
  src: string | StaticImport;
  alt: string;
  title: string;
  description?: string;
  nextBtn?: {
    href: string;
  };
};
const BetterBgImg = dynamic(
  () => import("@/components/custom/HomePage/BetterBgImg")
);
export default function ItemImageCarousel(props: ItemImageCarousel) {
  return (
    <>
      <Paper
        sx={{
          position: "relative",
          width: "100%",
          height: "60vh",
          minHeight: "400px",
          maxHeight: "720px",
        }}
      >
        <BetterBgImg src={props.src} alt={props.alt} priority />
        <ContainerItemTextCarousel>
          <h1>{props.title && props.title}</h1>
          <p>{props.description && props.description}</p>
          <Button variant="outlined">Pelajari Lebih Lanjut</Button>
        </ContainerItemTextCarousel>
      </Paper>
    </>
  );
}
