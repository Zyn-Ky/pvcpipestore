"use client";

import { styled } from "@mui/material";
import Image from "next/image";

const BetterBgImg = styled(Image)(({ theme }) => ({
  width: "100%",
  height: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  objectFit: "cover",
  pointerEvents: "none",
  filter: "brightness(0.9) blur(2px)",
}));
export default BetterBgImg;
