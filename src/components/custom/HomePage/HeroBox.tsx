"use client";

import { Box, styled } from "@mui/material";

const ContainerItemTextCarousel = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  color: "#ffffff",
  padding: "3rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  textAlign: "center",
  "& p": {
    marginBottom: "1rem",
  },
}));

export { ContainerItemTextCarousel };
