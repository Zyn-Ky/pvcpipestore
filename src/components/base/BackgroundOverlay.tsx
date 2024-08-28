"use client";
import { Box, useTheme } from "@mui/material";
import { PropsWithChildren } from "react";

export default function BackgroundOverlay(props: PropsWithChildren) {
  const theme = useTheme();
  return (
    <Box
      component="main"
      id="content_ui"
      role="main"
      sx={{ backgroundColor: theme.palette.background.default }}
    >
      {props.children && props.children}
    </Box>
  );
}
