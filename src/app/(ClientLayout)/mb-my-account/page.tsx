import paths from "@/components/paths";
import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import Link from "next/link";
import CSS from "@/scss/ClientMyAccount.module.scss";
import { InfoOutlined } from "@mui/icons-material";
import SITE_CONFIG from "@/components/config";
import { Metadata } from "next";
import { AvailableUserAction, SummaryCurrentUser } from "./HeaderModule";
import { LogoutBtn } from "./MenuModule";

export const metadata: Metadata = {
  title: `Akun - ${SITE_CONFIG.SEO.Title}`,
};

export default function AccountSummary() {
  return (
    <div className={CSS.Container}>
      <Paper className={CSS.InfoSummary} elevation={2}>
        <div className={CSS.Account}>
          <SummaryCurrentUser />
        </div>
        <div className={CSS.AccountAction}>
          <AvailableUserAction />
        </div>
      </Paper>
      <List component="nav" aria-labelledby="nested-list-subheader">
        <ListItemButton>
          <ListItemIcon>
            <InfoOutlined />
          </ListItemIcon>
          <ListItemText primary="SELLER_CENTER_LINK" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <InfoOutlined />
          </ListItemIcon>
          <ListItemText primary="STATUS_LINK" />
        </ListItemButton>
        <ListItemButton LinkComponent={Link} href={paths.SETTINGS_PAGE}>
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
        <LogoutBtn />
        <ListItemButton>
          <ListItemIcon>
            <InfoOutlined />
          </ListItemIcon>
          <ListItemText primary="GO_TOS_LINK" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <InfoOutlined />
          </ListItemIcon>
          <ListItemText primary="GO_PRIVACY_LINK" />
        </ListItemButton>
      </List>
    </div>
  );
}
