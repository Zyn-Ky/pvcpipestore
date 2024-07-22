import CSS from "@/scss/HomePage.module.scss";
import { BetterBigCarousel } from "@/components";
import { Button, Paper, Typography } from "@mui/material";
import Image_Banner2 from "./hero-main-2.webp";
import Image_Banner3 from "./hero-main-3.jpg";
import Image_Banner4 from "./hero-main-4.jpg";
import { ContainerItemTextCarousel } from "@/components/custom/HomePage/HeroBox";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import OurServices from "@/components/custom/HomePage/OurServices";
import OurPartners from "@/components/custom/HomePage/OurPartners";
import {
  PartnerHocoImg,
  PartnerItronImg,
  PartnerKitzImg,
  PartnerOndaImg,
  PartnerPenguinImg,
  PartnerPerrunoImg,
  PartnerPolyfuseImg,
  PartnerRucika1Img,
  PartnerRucikaImg,
  PartnerYutaImg,
} from "@/components/assets/images";

const ItemImageCarousel = dynamic(
  () => import("@/components/custom/HomePage/ItemImageCarousel")
);
const FancySeperator = dynamic(
  () => import("@/components/custom/HomePage/FancySeperator")
);

export default function Home() {
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
        <Typography fontSize="150%" fontWeight="bold" gutterBottom>
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
      <div className={CSS.Partners}>
        <Typography fontSize="150%" fontWeight="bold" gutterBottom>
          Our Partners
        </Typography>
        <div className={CSS.LogoLists}>
          <OurPartners nextImage={PartnerHocoImg} alt="Hoco® Logo" />
          <OurPartners nextImage={PartnerItronImg} alt="Itron® Logo" />
          <OurPartners nextImage={PartnerKitzImg} alt="Kitz® Logo" />
          <OurPartners nextImage={PartnerOndaImg} alt="Onda® Logo" />
          <OurPartners nextImage={PartnerPenguinImg} alt="Penguin® Logo" />
          <OurPartners nextImage={PartnerPerrunoImg} alt="Perruno® Logo" />
          <OurPartners nextImage={PartnerPolyfuseImg} alt="Polyfuse® Logo" />
          <OurPartners nextImage={PartnerRucika1Img} alt="Rucika Kelen® Logo" />
          <OurPartners nextImage={PartnerRucikaImg} alt="Hoco® Logo" />
          <OurPartners nextImage={PartnerYutaImg} alt="Yuta© Logo" />
        </div>
      </div>
      <div className={CSS.AboutCompany}>
        <Typography
          fontSize="150%"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          Tentang Kami
        </Typography>
        <Typography variant="body2" textAlign="center">
          Distributor Pipa uPVC yang menyediakan pipa jenis Pipa uPVC yang
          berkualitas tinggi dengan harga yang terjangkau.
        </Typography>
      </div>
      <div className={CSS.RecommendationsProd}></div>
    </>
  );
}
