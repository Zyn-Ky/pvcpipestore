import { AppBar, styled } from "@mui/material";

const BetterAppBar = styled(AppBar)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.common.black
      : theme.palette.grey[100],
  color:
    theme.palette.mode === "dark"
      ? theme.palette.common.white
      : theme.palette.common.black,
}));



export default BetterAppBar;
