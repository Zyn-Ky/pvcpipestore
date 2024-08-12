"use client";

import {
  AvailableThemeMode,
  useGlobalSettings,
} from "@/components/base/ClientThemeWrapper";
import { List, ListItemButton, ListItemText } from "@mui/material";

export default function ThemeSettingsClientLayout() {
  const { SetThemeMode } = useGlobalSettings();
  return (
    <>
      <h1>Tema</h1>
      <List component="nav" aria-label="Settings Section">
        {[
          ["light", "Terang"],
          ["dark", "Gelap"],
          ["system", "Sistem"],
        ].map((btn) => (
          <ListItemButton
            key={`SETTINGS_BTN_${btn[1]}`}
            onClick={() => SetThemeMode(btn[0] as AvailableThemeMode)}
          >
            <ListItemText primary={btn[1]} />
          </ListItemButton>
        ))}
      </List>
    </>
  );
}
