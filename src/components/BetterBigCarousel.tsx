"use client";
import { styled } from "@mui/material";
import { memo } from "react";
import Carousel from "react-material-ui-carousel";

const BetterBigCarousel = memo(
  styled(Carousel)(({ theme }) => ({
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  }))
);

export default BetterBigCarousel;
