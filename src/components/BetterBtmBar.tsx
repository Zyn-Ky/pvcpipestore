import { BottomNavigation, styled } from "@mui/material";

const BetterBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.common.black
      : theme.palette.grey[100],
  color:
    theme.palette.mode === "dark"
      ? theme.palette.common.white
      : theme.palette.common.black,
  zIndex: theme.zIndex.appBar,
  // display: "none",
  [theme.breakpoints.down("sm")]: {
    display: "flex",
  },
}));

export default BetterBottomNavigation;
