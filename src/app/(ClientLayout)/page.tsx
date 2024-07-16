import Image from "next/image";
import CSS from "@/scss/HomePage.module.scss";
import { BetterBigCarousel, XAppBar } from "@/components";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import Image_Banner1 from "./hero-main.webp";
import Image_Banner2 from "./hero-main-2.webp";
import Image_Banner3 from "./hero-main-3.jpg";
import Image_Banner4 from "./hero-main-4.jpg";
import Carousel from "react-material-ui-carousel";
import { ContainerItemTextCarousel } from "@/components/custom/HomePage/HeroBox";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import BetterBgImg from "@/components/custom/HomePage/BetterBgImg";
import ProductCard from "@/components/base/ProductCard";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import FancySeperator from "@/components/custom/HomePage/FancySeperator";
import { ReactNode } from "react";

type ItemImageCarousel = {
  src: string | StaticImport;
  alt: string;
  title: string;
  description?: string;
  nextBtn?: {
    href: string;
  };
};

type ItemOurServices = {
  icon: ReactNode;
  header: string;
  text: string;
};

export default function Home() {
  function ItemImageCarousel(props: ItemImageCarousel) {
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
          <BetterBgImg src={props.src} alt={props.alt} />
          <ContainerItemTextCarousel>
            <h1>{props.title && props.title}</h1>
            <p>{props.description && props.description}</p>
            <Button variant="outlined">Primary</Button>
          </ContainerItemTextCarousel>
        </Paper>
      </>
    );
  }
  function OurServices(props: ItemOurServices) {
    return (
      <div className={CSS.Item}>
        {props.icon && props.icon}
        <Typography
          variant="h5"
          gutterBottom
          textTransform="capitalize"
          className={CSS.ItemTitle}
        >
          {props.header && props.header}
        </Typography>
        <Typography variant="caption">{props.text && props.text}</Typography>
      </div>
    );
  }
  return (
    <>
      <div className={CSS.HeroBox}>
        <BetterBigCarousel
          animation="slide"
          cycleNavigation
          swipe
          autoPlay
          indicators={false}
          navButtonsAlwaysVisible
        >
          <ItemImageCarousel
            src={Image_Banner4}
            alt="Banner Product 1 - uPVC SNI"
            title="Pipa uPVC SNI"
            description="Pipa uPVC SNI Untuk Instalasi air bersih atau air minum yang biasa di gunakan untuk PDAM"
          />
          <ItemImageCarousel
            src={Image_Banner2}
            alt="Banner Product 2 - uPVC JIS"
            title="Pipa uPVC SDR-41"
            description="Pipa uPVC SDR-41 berkualitas tinggi"
          />
          <ItemImageCarousel
            src={Image_Banner3}
            alt="Fitting uPVC Standard & SNI"
            title="Fitting uPVC Standard & SNI"
            description="Mulai dari Rp 1.200"
          />
        </BetterBigCarousel>
        <FancySeperator />
      </div>
      <div className={CSS.OurServicesList}>
        <Typography variant="h6" gutterBottom>
          Kenapa harus memilih kami?
        </Typography>
        <div className={CSS.UXLists}>
          <OurServices
            icon={<FlightLandIcon fontSize="large" />}
            header="Pengiriman Aman dan Cepat"
            text="Kami selalu mengutamakan pengiriman tepat waktu ke seluruh Indonesia."
          />
          <OurServices
            icon={<AdsClickIcon fontSize="large" />}
            header="Solusi Terbaik"
            text="Kami memberikan barang yang berekualitas dan memberikan solusi terbaik untuk kebutuhan anda"
          />
          <OurServices
            icon={<EmojiEventsIcon fontSize="large" />}
            header="Professional Team"
            text="Kami melayani dengan tim yang sudah berpengalaman dan professional."
          />
        </div>
      </div>
      <div className={CSS.RecommendationsProd}>
        <Typography variant="h4" gutterBottom>
          Best of the Week!
        </Typography>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Array.from(Array(10)).map((_, index) => (
            <Grid xs={2} sm={4} md={4} key={index}>
              <ProductCard />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}
