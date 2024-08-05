import paths from "@/components/paths";
import {
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import Link from "next/link";
import CSS from "@/scss/ClientMyAccount.module.scss";
import { InfoOutlined } from "@mui/icons-material";
import SITE_CONFIG from "@/components/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Akun - ${SITE_CONFIG.SEO.Title}`,
};

export default function AccountSummary() {
  return (
    <>
      <div className={CSS.InfoSummary}>
        <div className={CSS.Account}>Belum Masuk</div>
        <div className={CSS.AccountAction}>
          <Link href={paths.AUTH_LOGIN}>
            <Button variant="contained">Login</Button>
          </Link>
          <Link href={paths.AUTH_REGISTER}>
            <Button variant="outlined">Daftar</Button>
          </Link>
        </div>
      </div>
      <List component="nav" aria-labelledby="nested-list-subheader">
        <ListItemButton>
          <ListItemIcon>
            <InfoOutlined />
          </ListItemIcon>
          <ListItemText primary="STATUS_LINK" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <InfoOutlined />
          </ListItemIcon>
          <ListItemText primary="SETTINGS_LINK" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <InfoOutlined />
          </ListItemIcon>
          <ListItemText primary="CARTS_LINK" />
        </ListItemButton>
        <Divider sx={{ my: 1 }} />
        <ListItemButton>
          <ListItemIcon>
            <InfoOutlined />
          </ListItemIcon>
          <ListItemText primary="UNKNOWN_LINK" />
        </ListItemButton>
      </List>
    </>
  );
}
