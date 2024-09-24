import { Box } from "@mui/material";
import { useTranslations } from "next-intl";

export default function AccessibilityJumpKey(props: { notFloating?: boolean }) {
  const text = useTranslations("BASE");
  return (
    <>
      <Box
        component="a"
        href="#root-content-ui"
        className={`size-auto overflow-hidden z-[9999999999] p-1 bg-white text-black opacity-0 absolute left-[-999999999] top-16 focus:opacity-100 ${
          props.notFloating
            ? "mx-4 static w-0 h-0 focus:w-auto focus:h-auto"
            : "top-[-99999999999px] w-0 h-0 focus:w-auto focus:h-auto focus:left-4 focus:top-20"
        }`}
      >
        {text("JUMP_TO_CONTENT")}
      </Box>
    </>
  );
}
