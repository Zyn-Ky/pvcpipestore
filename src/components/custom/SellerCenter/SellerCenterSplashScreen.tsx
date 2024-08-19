import { Box, Typography } from "@mui/material";

export default function SellerCenterSplashScreen() {
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.drawer + 9,
          backgroundColor: (theme) => theme.palette.background.default,
          color: (theme) => theme.palette.text.primary,
        }}
      >
        <Typography>Memuat</Typography>
      </Box>
    </>
  );
}
