import paths, { GeneratePpPage, GenerateTosPage } from "@/components/paths";
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
import { Dashboard, Info, InfoOutlined, PrivacyTip } from "@mui/icons-material";
import SITE_CONFIG from "@/components/config";
import { Metadata } from "next";
import { AvailableUserAction, SummaryCurrentUser } from "./HeaderModule";
import { LogoutBtn } from "./MenuModule";
import PromptEmailVerification from "@/components/base/PromptEmailVerification";
import { useTranslations } from "next-intl";
import SettingsIcon from "@mui/icons-material/Settings";
import ProtectedHiddenDevelopmentComponent from "@/components/base/ProtectedHiddenDevComponent";
import ProtectedSellerOnlyRoute from "@/components/base/ProtectedSellerOnlyRoute";
import PopupTextTriggerBtn from "./PopupTextTriggerBtn";
import { getUserLocale } from "@/libs/locale";

export const metadata: Metadata = {
  title: `Akun`,
};

export default function AccountSummary() {
  const t = useTranslations("BASE");
  const locale = getUserLocale();
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
        <ProtectedSellerOnlyRoute>
          <ListItemButton>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary={t("SELLER_CENTER_TEXT")} />
          </ListItemButton>
        </ProtectedSellerOnlyRoute>
        <ListItemButton LinkComponent={Link} href={paths.SETTINGS_PAGE}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary={t("SETTINGS_TEXT")} />
        </ListItemButton>
        <LogoutBtn />
        <Divider className="my-4" />
        <ProtectedHiddenDevelopmentComponent>
          <PopupTextTriggerBtn
            icon={<Info />}
            text={t("SERVICE_TOS_BTN_TEXT")}
            iframeURL={GenerateTosPage(locale)}
          />
          <PopupTextTriggerBtn
            text={t("SERVICE_PP_BTN_TEXT")}
            icon={<PrivacyTip />}
            iframeURL={GeneratePpPage(locale)}
          />
        </ProtectedHiddenDevelopmentComponent>
      </List>
    </div>
  );
}
