import CSS from "@/scss/SettingsUISharedLayout.module.scss";
import { Drafts, Inbox } from "@mui/icons-material";
import {
  Divider,
  Drawer,
  List,
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

export default async function SettingsUISharedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return (
    <>
      <div className={CSS.SettingsContainer}>
        <SettingsSidebarResponsive>
          <div className={CSS.Sidebar}>
            <h1>Pengaturan</h1>
            <List component="nav" aria-label="Settings Section">
              {[
                ["/set-prefs/account", "Akun"],
                ["/set-prefs/mb-themes", "Tema"],
                ["/set-prefs/language", "Bahasa"],
                ["/set-prefs/address-perf", "Alamat Pengiriman"],
                ["/set-prefs/payments-mode", "Metode Pembayaran"],
              ].map((btn) => (
                <ListItemButton
                  LinkComponent={Link}
                  href={btn[0]}
                  key={`SETTINGS_BTN_${btn[1]}`}
                >
                  <ListItemText primary={btn[1]} />
                </ListItemButton>
              ))}
            </List>
          </div>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            className="block max-[600px]:hidden"
          />
        </SettingsSidebarResponsive>
        <ChildPageResponsive>
          <div className={CSS.Child}>{children}</div>
        </ChildPageResponsive>
      </div>
    </>
  );
}
