"use client";
import CSS from "@/scss/HomePage.module.scss";
import { BetterBigCarousel } from "@/components";
import {
  HomePage_CoverImg,
  HomePage_Image_Banner2,
  HomePage_Image_Banner3,
  HomePage_Image_Banner4,
} from "@/components/assets/images";
import { Collapse, Fab, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useState } from "react";
const PauseIcon = dynamic(() => import("@mui/icons-material/Pause"));
const PlayArrowIcon = dynamic(() => import("@mui/icons-material/PlayArrow"));
const ItemImageCarousel = dynamic(
  () => import("@/components/custom/HomePage/ItemImageCarousel")
);

export function CarouselModule() {
  const [autoPlay, setAutoPlay] = useState(true);
  const [isHoveringMouse, setIsHoveringMouse] = useState(false);
  return (
    <>
      <BetterBigCarousel
        animation="slide"
        cycleNavigation
        swipe
        autoPlay={autoPlay}
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
      <Fab
        variant="extended"
        size="small"
        color="primary"
        className={CSS.AutoplayFab}
        onClick={() => setAutoPlay(!autoPlay)}
        onMouseEnter={() => setIsHoveringMouse(true)}
        onMouseLeave={() => setIsHoveringMouse(false)}
      >
        {autoPlay && <PauseIcon />}
        {!autoPlay && <PlayArrowIcon />}
        <Collapse in={isHoveringMouse} orientation="horizontal" unmountOnExit>
          <Typography noWrap ml={1}>
            {autoPlay && "Hentikan Autoplay"}
            {!autoPlay && "Autoplay"}
          </Typography>
        </Collapse>
      </Fab>
    </>
  );
}
