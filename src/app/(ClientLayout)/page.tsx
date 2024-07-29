import CSS from "@/scss/HomePage.module.scss";
import { BetterBigCarousel } from "@/components";
import { Button, Paper, Typography } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import dynamic from "next/dynamic";
import OurServices from "@/components/custom/HomePage/OurServices";
import OurPartners from "@/components/custom/HomePage/OurPartners";
import {
  HomePage_CoverImg,
  HomePage_Image_Banner2,
  HomePage_Image_Banner3,
  HomePage_Image_Banner4,
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
    <div itemType="https://schema.org/Organization" itemScope>
      <div className={CSS.HeroBox}>
        <BetterBigCarousel
          animation="slide"
          cycleNavigation
          swipe
          autoPlay
          indicators={false}
        >
          <ItemImageCarousel
            src={HomePage_CoverImg}
            alt="Banner Cover uPVC"
            title="DISTRIBUTOR PIPA uPVC TERPERCAYA"
            description="Solusi Tahan Lama dan Terpercaya untuk Distribusi Air Bersih yang Aman, Efisien, dan Berkualitas Tinggi, Meningkatkan Kualitas Hidup dan Mendukung Kebutuhan Infrastruktur Masa Depan"
            key={"COVER"}
            actionButton={[
              {
                href: "/shop",
                text: "Belanja Sekarang",
                outlined: false,
              },
              {
                href: "/",
                text: "Hubungi Kami",
                outlined: true,
              },
            ]}
          />
          <ItemImageCarousel
            src={HomePage_Image_Banner4}
            alt="Banner Product 1 - uPVC SNI"
            title="Pipa uPVC SNI"
            description="Pipa uPVC SNI Untuk Instalasi air bersih atau air minum yang biasa di gunakan untuk PDAM"
            actionButton={[
              {
                href: "/shop/pipa-pvc/sni",
                text: "Jelajahi",
                outlined: false,
              },
            ]}
          />
          <ItemImageCarousel
            src={HomePage_Image_Banner2}
            alt="Banner Product 2 - uPVC JIS"
            title="Pipa uPVC SDR-41"
            description="Pipa uPVC SDR-41 berkualitas tinggi"
            actionButton={[
              {
                href: "/shop/pipa-pvc/jis",
                text: "Jelajahi",
                outlined: false,
              },
            ]}
          />
          <ItemImageCarousel
            src={HomePage_Image_Banner3}
            alt="Fitting uPVC Standard & SNI"
            title="Fitting uPVC Standard & SNI"
            description="Mulai dari Rp 1.200"
            actionButton={[
              {
                href: "/shop/pipa-pvc/fitting?f=jis,sni",
                text: "Jelajahi",
                outlined: false,
              },
            ]}
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
    </div>
  );
}
