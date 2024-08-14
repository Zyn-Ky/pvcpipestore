import { Box } from "@mui/material";
import { useTranslations } from "next-intl";

export default function AccessibilityJumpKey() {
  const text = useTranslations("BASE");
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
        {text("JUMP_TO_CONTENT")}
      </Box>
    </>
  );
}
