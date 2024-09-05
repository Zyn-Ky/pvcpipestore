"use client";

import {
  Add,
  BrightnessAuto,
  DarkMode,
  Inbox,
  LightMode,
  Mail,
  Menu,
} from "@mui/icons-material";
import {
  AppBar as MuiAppBar,
  Drawer as MuiDrawer,
  IconButton,
  Toolbar,
  AppBarProps,
  styled,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
  CSSObject,
  Collapse,
  useTheme,
  useMediaQuery,
  Fab,
  Box,
  Zoom,
  Tooltip,
} from "@mui/material";
import Link from "next/link";
import { PropsWithChildren, ReactNode, useState } from "react";
import paths from "./paths";
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
const StyledBoxContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  minWidth: `calc(100vw - ${theme.spacing(7)} - 26px)`,
  transition: theme.transitions.create(["transform"]),
  transform: "scale(1) translateX(0px)",
  [theme.breakpoints.up("sm")]: {
    minWidth: `calc(100vw - ${theme.spacing(8)} - 18px)`,
  },
}));

import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import HomeIcon from "@mui/icons-material/Home";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { useGlobalThemeSettings } from "./base/ClientThemeWrapper";
export default function SellerAppBar(props: PropsWithChildren) {
  const theme = useTheme();
  const [openSidebar, setOpenSidebar] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { SetThemeMode, ThemeMode } = useGlobalThemeSettings();
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpenSidebar(!openSidebar)}
            edge="start"
            sx={{
              mr: 1,
            }}
          >
            <Menu
              sx={{
                transform: `rotate(${openSidebar ? 90 : 0}deg)`,
                transition: (theme) =>
                  theme.transitions.create("transform") + " !important",
              }}
            />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Seller Center
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={"permanent"}
        anchor="left"
        open={openSidebar}
        onClose={() => setOpenSidebar(false)}
      >
        <Toolbar />
        <List className="flex-1">
          <ListItem
            sx={{
              display: "block",
              padding: openSidebar ? 1 : 0,
              marginY: openSidebar ? 0 : 1,
              transition: (theme) =>
                theme.transitions.create(["padding", "margin"]),
            }}
          >
            <Box position="relative" height={48}>
              <Zoom in={!openSidebar} unmountOnExit>
                <Tooltip title="Tambah Produk" placement="right">
                  <Fab
                    variant="circular"
                    size="medium"
                    color="primary"
                    sx={{
                      position: "absolute",
                      margin: "auto",
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                    }}
                    LinkComponent={Link}
                    href={paths.POST_PRODUCT_ADMIN_PAGE}
                  >
                    <Add />
                  </Fab>
                </Tooltip>
              </Zoom>
              <Zoom in={openSidebar} unmountOnExit>
                <Fab
                  variant="extended"
                  size="medium"
                  color="primary"
                  sx={{
                    position: "absolute",
                    margin: "auto",
                    width: "max-content",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                  }}
                  LinkComponent={Link}
                  href={paths.POST_PRODUCT_ADMIN_PAGE}
                >
                  <Add />
                  <Collapse orientation="horizontal" in={openSidebar}>
                    <Typography
                      sx={{ ml: 1 }}
                      display="flex"
                      alignItems="center"
                      height="100%"
                    >
                      Tambah Produk
                    </Typography>
                  </Collapse>
                </Fab>
              </Zoom>
            </Box>
          </ListItem>
          {(
            [
              [<HomeIcon key={1} />, "Dasbor", paths.SELLER_ADMIN_PAGE],
              [<InventoryIcon key={2} />, "Produk", paths.SELLER_ADMIN_PAGE],
              [<CategoryIcon key={3} />, "Kategori", paths.SELLER_ADMIN_PAGE],
              [
                <FeedbackIcon key={4} />,
                "Masukan",
                paths.FEEDBACKS_LIST_ADMIN_PAGE,
              ],
            ] as [ReactNode, string, string][]
          ).map((item, index) => (
            <ListItem
              key={item[1].toString() + index.toString()}
              disablePadding
              sx={{ display: "block" }}
            >
              <Tooltip
                title={!openSidebar ? item[1] : ""}
                key={item[1].toString() + index.toString()}
                placement="right"
              >
                <ListItemButton
                  LinkComponent={Link}
                  href={item[2]}
                  key={item[1].toString() + index.toString()}
                  sx={{
                    minHeight: 48,
                    justifyContent: "left",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: "left",
                    }}
                  >
                    {item[0]}
                  </ListItemIcon>
                  <Collapse orientation="horizontal" in={openSidebar}>
                    <ListItemText
                      primary={item[1]}
                      sx={{
                        ml: 3,
                      }}
                    />
                  </Collapse>
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
        <Collapse orientation="vertical" in={openSidebar} unmountOnExit>
          <List>
            {(
              [
                [
                  <>
                    {ThemeMode === "system" && <BrightnessAuto key={11} />}
                    {ThemeMode === "light" && <LightMode key={12} />}
                    {ThemeMode === "dark" && <DarkMode key={13} />}
                  </>,
                  ThemeMode === "system"
                    ? "Sistem"
                    : ThemeMode === "dark"
                    ? "Gelap"
                    : ThemeMode === "light"
                    ? "Terang"
                    : "",
                  () => {
                    if (ThemeMode === "system") SetThemeMode("dark");
                    if (ThemeMode === "dark") SetThemeMode("light");
                    if (ThemeMode === "light") SetThemeMode("system");
                  },
                ],
              ] as [ReactNode, string, () => void | string][]
            ).map((item, index) => (
              <ListItem
                key={item[1] + index.toString()}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: "left",
                    px: 2.5,
                  }}
                  key={item[1].toString() + index.toString()}
                  {...(typeof item[2] === "string"
                    ? { LinkComponent: Link, href: item[2] }
                    : {
                        onClick:
                          typeof item[2] === "function" ? item[2] : () => {},
                      })}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: "center",
                    }}
                  >
                    {item[0]}
                  </ListItemIcon>
                  <Collapse orientation="horizontal" in={openSidebar}>
                    <ListItemText
                      primary={item[1]}
                      sx={{
                        ml: 3,
                      }}
                    />
                  </Collapse>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </Drawer>
      <StyledBoxContainer
        style={
          openSidebar
            ? {
                transform: "scale(0.75) translateX(-105px)",
              }
            : {}
        }
      >
        {props.children && props.children}
      </StyledBoxContainer>
    </>
  );
}
