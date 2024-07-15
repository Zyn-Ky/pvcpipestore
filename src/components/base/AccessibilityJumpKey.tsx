import { Box } from "@mui/material";

export default function AccessibilityJumpKey() {
  return (
    <>
      <Box
        component="a"
        href="#content_ui"
        sx={{
          position: "absolute",
          left: -999999999,
          top: 64,
          width: "auto",
          height: "auto",
          zIndex: 9999999999,
          overflow: "hidden",
          padding: 1,
          background: "#ffffff",
          color: "#000000",
          "&:focus": {
            left: 0,
          },
        }}
      >
        Jump to content
      </Box>
    </>
  );
}
