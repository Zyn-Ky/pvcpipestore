"use client";
import Image, { StaticImageData } from "next/image";
import Carousel from "react-material-ui-carousel";
import CSS from "@/scss/custom/TestimonialUI.module.scss";
import { Avatar, Collapse, Fab, Typography } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { memo, useState } from "react";
import dynamic from "next/dynamic";
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
  const [autoPlay, setAutoPlay] = useState(true);
  const [isHoveringMouse, setIsHoveringMouse] = useState(false);
  function Item(props: ItemProp) {
    const [textExpanded, setTextExpanded] = useState(false);
    return (
      <>
        <div className={CSS.TestiItem}>
          <Avatar
            src={
              props.avatar &&
              (typeof props.avatar === "string"
                ? props.avatar
                : props.avatar.src)
            }
            sx={{ width: 80, height: 80, mb: 2 }}
          />
          <Typography variant="h5" gutterBottom textAlign="center">
            {props.authorName && props.authorName}
          </Typography>
          <div className={CSS.TextContainer}>
            <Collapse collapsedSize={145} in={textExpanded}>
              <Typography
                variant="body1"
                onClick={() => setTextExpanded(!textExpanded)}
                sx={{ overflow: "auto", cursor: "pointer" }}
              >
                <FormatQuoteIcon color="primary" className={CSS.QuoteIcon} />
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
      <div className={CSS.Wrapper}>
        <Carousel
          className={CSS.CarouselWrapper}
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
          sx={{ bottom: "-1rem", left: 0 }}
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
      </div>
    </>
  );
});

export default TestimonialModule;
