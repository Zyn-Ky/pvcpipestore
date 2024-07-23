import {
  BottomNavigation,
  BottomNavigationAction,
  styled,
} from "@mui/material";

const BetterBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
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

export const BetterBottomNavigationAction = styled(BottomNavigationAction)(
  ({ theme }) => ({
    minWidth: 0,
  })
);

export default BetterBottomNavigation;
