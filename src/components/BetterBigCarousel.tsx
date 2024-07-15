"use client";
import { styled } from "@mui/material";
import Carousel from "react-material-ui-carousel";

const BetterBigCarousel = styled(Carousel)(({ theme }) => ({
  position: "absolute",
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
}));

export default BetterBigCarousel;
