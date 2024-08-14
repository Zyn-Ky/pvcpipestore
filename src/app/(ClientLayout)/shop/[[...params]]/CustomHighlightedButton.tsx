"use client";

import { ButtonBase, styled } from "@mui/material";

const HighlightedButton = styled(ButtonBase)(({ theme }) => ({
  transition: theme.transitions.create("outline-offset"),
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 100,
  },
  border: "2px solid currentColor",
  outline: "2px solid currentColor",
  outlineOffset: "-2px",
  "&:hover, &:focus, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    outlineOffset: "2px",
  },
}));
export default HighlightedButton;
