import { Box } from "@mui/material";
import { PropsWithChildren } from "react";

export default function ColorModeProvider(props: PropsWithChildren) {
  return (
    <Box
      component="main"
      id="content_ui"
      role="main"
      sx={{ backgroundColor: (theme) => theme.palette.background.default }}
    >
      {props.children && props.children}
    </Box>
  );
}
