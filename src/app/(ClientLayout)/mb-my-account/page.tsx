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
import PromptEmailVerification from "@/components/base/PromptEmailVerification";
import { useTranslations } from "next-intl";
import SettingsIcon from "@mui/icons-material/Settings";
import ProtectedHiddenDevelopmentComponent from "@/components/base/ProtectedHiddenDevComponent";
import ProtectedSellerOnlyRoute from "@/components/base/ProtectedSellerOnlyRoute";

export const metadata: Metadata = {
  title: `Akun`,
};

export default function AccountSummary() {
  const t = useTranslations("BASE");
  return (
    <div className={CSS.Container}>
      <div>
        <PromptEmailVerification />
        <Paper className={CSS.InfoSummary} elevation={2}>
          <div className={CSS.Account}>
            <SummaryCurrentUser />
          </div>
          <div className={CSS.AccountAction}>
            <AvailableUserAction />
          </div>
        </Paper>
      </div>
      <List component="nav">
        <ProtectedHiddenDevelopmentComponent>
          <ProtectedSellerOnlyRoute>
            <ListItemButton>
              <ListItemIcon>
                <InfoOutlined />
              </ListItemIcon>
              <ListItemText primary="SELLER_CENTER_LINK" />
            </ListItemButton>
          </ProtectedSellerOnlyRoute>
          <ListItemButton>
            <ListItemIcon>
              <InfoOutlined />
            </ListItemIcon>
            <ListItemText primary="STATUS_LINK" />
          </ListItemButton>
        </ProtectedHiddenDevelopmentComponent>
        <ListItemButton LinkComponent={Link} href={paths.SETTINGS_PAGE}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary={t("SETTINGS_TEXT")} />
        </ListItemButton>
        <ProtectedHiddenDevelopmentComponent>
          <ListItemButton>
            <ListItemIcon>
              <InfoOutlined />
            </ListItemIcon>
            <ListItemText primary="CARTS_LINK" />
          </ListItemButton>
        </ProtectedHiddenDevelopmentComponent>
        <Divider className="my-4" />
        <LogoutBtn />
        <ProtectedHiddenDevelopmentComponent>
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
        </ProtectedHiddenDevelopmentComponent>
      </List>
    </div>
  );
}
