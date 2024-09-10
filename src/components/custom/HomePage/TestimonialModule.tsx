"use client";
import Image, { StaticImageData } from "next/image";
import Carousel from "react-material-ui-carousel";
import { Avatar, Collapse, Fab, Typography } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { memo, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
const PauseIcon = dynamic(() => import("@mui/icons-material/Pause"));
const PlayArrowIcon = dynamic(() => import("@mui/icons-material/PlayArrow"));
type ItemProp = {
  avatar?: StaticImageData | string;
  authorName: string;
  textContent: string;
};

type TestimonialModuleProps = {
  items: ItemProp[];
};

const TestimonialModule = memo(function TestimonialModule(
  props: TestimonialModuleProps
) {
  const text = useTranslations("BASE");
  const [autoPlay, setAutoPlay] = useState(true);
  const [isHoveringMouse, setIsHoveringMouse] = useState(false);
  function Item(props: ItemProp) {
    const [textExpanded, setTextExpanded] = useState(false);
    return (
      <>
        <div className="flex flex-col items-center h-[300px] px-20">
          <Avatar
            src={
              props.avatar &&
              (typeof props.avatar === "string"
                ? props.avatar
                : props.avatar.src)
            }
            className="size-[80px] mb-4"
          />
          <Typography variant="h5" gutterBottom textAlign="center">
            {props.authorName && props.authorName}
          </Typography>
          <div className="h-[200px] select-text overflow-y-auto">
            <Collapse collapsedSize={145} in={textExpanded}>
              <Typography
                variant="body1"
                onClick={() => setTextExpanded(!textExpanded)}
                className="overflow-auto cursor-pointer"
              >
                <FormatQuoteIcon color="primary" />
                {props.textContent && props.textContent}
              </Typography>
            </Collapse>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Carousel
        className="w-full"
        animation="fade"
        cycleNavigation
        swipe={false}
        autoPlay={autoPlay}
        indicators
        navButtonsAlwaysVisible
        stopAutoPlayOnHover
      >
        {props.items.map((value, i) => (
          <Item {...value} key={i} />
        ))}
      </Carousel>

      <Fab
        variant="extended"
        size="small"
        color="primary"
        className="bottom-[-1rem] left-0"
        onClick={() => setAutoPlay(!autoPlay)}
        onMouseEnter={() => setIsHoveringMouse(true)}
        onMouseLeave={() => setIsHoveringMouse(false)}
        aria-label="Pause/Play Image auto slide"
      >
        {autoPlay && <PauseIcon />}
        {!autoPlay && <PlayArrowIcon />}
        <Collapse in={isHoveringMouse} orientation="horizontal" unmountOnExit>
          <Typography noWrap ml={1}>
            {autoPlay && text("PAUSE_AUTOPLAY")}
            {!autoPlay && text("PLAY_AUTOPLAY")}
          </Typography>
        </Collapse>
      </Fab>
    </>
  );
});

export default TestimonialModule;
