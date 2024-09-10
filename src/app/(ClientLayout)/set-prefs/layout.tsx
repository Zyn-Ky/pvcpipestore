import CSS from "@/scss/SettingsUISharedLayout.module.scss";
import { Drafts, Inbox } from "@mui/icons-material";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import ChildPageResponsive from "./ChildPageResponsive";
import SettingsSidebarResponsive from "./SettingsSidebarResponsive";
import FirstTimeSetupButton from "./FirstTimeSetupButton";
import paths from "@/components/paths";
import { useTranslations } from "next-intl";

export default function SettingsUISharedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const t = useTranslations("SETTINGS_PAGE");
  return (
    <>
      <div className={`${CSS.SettingsContainer} h-full`}>
        <SettingsSidebarResponsive>
          <div className={CSS.Sidebar}>
            <h1>{t("SIDEBAR_TITLE")}</h1>
            <List component="nav" aria-label="Settings Section">
              {[
                [
                  paths.SETTINGS_ACCOUNT_PAGE,
                  t("SIDEBAR_ACCOUNT_MANAGER_TEXT"),
                ],
                [paths.SETTINGS_THEME_PAGE, t("SIDEBAR_THEME_MANAGER_TEXT")],
                [
                  paths.SETTINGS_LANGUAGE_PAGE,
                  t("SIDEBAR_LANGUAGE_MANAGER_TEXT"),
                ],
                [
                  paths.SETTINGS_ADDRESS_PAGE,
                  t("SIDEBAR_ADDRESS_MANAGER_TEXT"),
                ],
                [
                  paths.SETTINGS_PAYMENT_PAGE,
                  t("SIDEBAR_PAYMENT_MANAGER_TEXT"),
                ],
              ].map((btn) => (
                <ListItemButton
                  LinkComponent={Link}
                  href={btn[0]}
                  key={`SETTINGS_BTN_${btn[1]}`}
                >
                  <ListItemText primary={btn[1]} />
                </ListItemButton>
              ))}
              <ListItem>
                BUILD_VERSION :{" "}
                {process.env.BUILD_VERSION && `v${process.env.BUILD_VERSION}`}
              </ListItem>
              <ListItem>BUILD_STATE : {process.env.BUILD_STATE}</ListItem>
            </List>
          </div>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            className="hidden muiSm:block"
          />
        </SettingsSidebarResponsive>
        <ChildPageResponsive>
          <div className={CSS.Child}>{children}</div>
        </ChildPageResponsive>
      </div>
    </>
  );
}
