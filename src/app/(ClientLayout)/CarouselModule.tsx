"use client";
import CSS from "@/scss/HomePage.module.scss";
import { BetterBigCarousel } from "@/components";
import {
  HomePage_CoverImg,
  HomePage_Image_Banner2,
  HomePage_Image_Banner3,
  HomePage_Image_Banner4,
} from "@/components/assets/images";
import { Collapse, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useTranslations } from "next-intl";
const Fab = dynamic(() => import("@mui/material/Fab"), {
  ssr: false,
});
const PauseIcon = dynamic(() => import("@mui/icons-material/Pause"), {
  ssr: false,
});
const PlayArrowIcon = dynamic(() => import("@mui/icons-material/PlayArrow"), {
  ssr: false,
});
const ItemImageCarousel = dynamic(
  () => import("@/components/custom/HomePage/ItemImageCarousel"),
  {
    ssr: false,
  }
);

export function CarouselModule() {
  const [autoPlay, setAutoPlay] = useState(true);
  const [isHoveringMouse, setIsHoveringMouse] = useState(false);
  const text = useTranslations("HOME_UI");
  const baseText = useTranslations("BASE");

  return (
    <>
      <BetterBigCarousel
        animation="fade"
        cycleNavigation
        navButtonsAlwaysVisible
        autoPlay={autoPlay}
        indicators={false}
        swipe={false}
      >
        <ItemImageCarousel
          src={HomePage_CoverImg}
          alt="Banner Cover 0"
          title={text("BANNER_TITLE_1")}
          description={text("BANNER_DESCRIPTION_1")}
          key={"COVER"}
          actionButton={[
            {
              href: "/shop",
              text: text("SHOP_NOW"),
              outlined: false,
            },
            {
              href: "/support-form",
              text: baseText("CONTACT_US"),
              outlined: true,
            },
          ]}
        />
        <ItemImageCarousel
          src={HomePage_Image_Banner4}
          alt="Banner Product 1"
          title={text("BANNER_TITLE_2")}
          description={text("BANNER_DESCRIPTION_2")}
          actionButton={[
            {
              href: "#keunggulan",
              text: baseText("KNOW_MORE"),
              outlined: false,
            },
          ]}
        />
        <ItemImageCarousel
          src={HomePage_Image_Banner2}
          alt="Banner Product 2"
          title={text("BANNER_TITLE_3")}
          description={text("BANNER_DESCRIPTION_3")}
          actionButton={[
            {
              href: "/shop/pipa-pvc/jis",
              text: baseText("DISCOVER"),
              outlined: false,
            },
          ]}
        />
        <ItemImageCarousel
          src={HomePage_Image_Banner3}
          alt="Fitting uPVC Standard & SNI"
          title={text("BANNER_TITLE_4")}
          description={text("BANNER_DESCRIPTION_4")}
          actionButton={[
            {
              href: "/shop/pipa-pvc/fitting?f=jis,sni",
              text: baseText("DISCOVER"),
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
            {autoPlay && baseText("PAUSE_AUTOPLAY")}
            {!autoPlay && baseText("PLAY_AUTOPLAY")}
          </Typography>
        </Collapse>
      </Fab>
    </>
  );
}
