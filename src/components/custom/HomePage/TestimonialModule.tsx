"use client";
import Image, { StaticImageData } from "next/image";
import Carousel from "react-material-ui-carousel";
import CSS from "@/scss/custom/TestimonialUI.module.scss";
import { Avatar, Collapse, Typography } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { useState } from "react";
type ItemProp = {
  avatar?: StaticImageData | string;
  authorName: string;
  textContent: string;
};

type TestimonialModuleProps = {
  items: ItemProp[];
};

export default function TestimonialModule(props: TestimonialModuleProps) {
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
          <Typography variant="h5" gutterBottom>
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
      <Carousel
        className={CSS.CarouselWrapper}
        animation="slide"
        cycleNavigation
        swipe={false}
        autoPlay
        indicators
        navButtonsAlwaysVisible
        stopAutoPlayOnHover
      >
        {props.items.map((value, i) => (
          <Item {...value} key={i} />
        ))}
      </Carousel>
    </>
  );
}
