"use client";

import {
  AvailableThemeMode,
  useGlobalThemeSettings,
} from "@/components/base/ClientThemeWrapper";
import CheckIcon from "@mui/icons-material/Check";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useTranslations } from "next-intl";

export default function ThemeSettingsClientLayout() {
  const { SetThemeMode, ThemeMode } = useGlobalThemeSettings();
  const t = useTranslations("THEME_MANAGER_PAGE");
  return (
    <>
      <h1>Tema</h1>
      <List component="nav">
        {[
          ["system", t("SYSTEM_THEME_TEXT")],
          ["dark", t("DARK_THEME_TEXT")],
          ["light", t("LIGHT_THEME_TEXT")],
        ].map((btn) => (
          <ListItemButton
            key={`SETTINGS_BTN_${btn[1]}`}
            onClick={() => SetThemeMode(btn[0] as AvailableThemeMode)}
          >
            {btn[0] === ThemeMode && (
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
            )}
            <ListItemText inset={btn[0] !== ThemeMode} primary={btn[1]} />
          </ListItemButton>
        ))}
      </List>
    </>
  );
}
