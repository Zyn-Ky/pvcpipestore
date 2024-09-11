"use client";
import { getClientLocale, setClientLocale } from "@/libs/clientLocale";
import CheckIcon from "@mui/icons-material/Check";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useEffectOnce } from "react-use";

export default function LanguageSelector() {
  const currentLocale = getClientLocale();

  return (
    <>
      <Typography variant="h4" component="h1" fontWeight="bold">
        Bahasa
      </Typography>
      <List component="nav">
        {[["id-ID", "Bahasa Indonesia"]].map((btn) => (
          <ListItemButton
            key={`SETTINGS_BTN_${btn[1]}`}
            onClick={() => setClientLocale(btn[0])}
          >
            {currentLocale === btn[0] && (
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
            )}
            <ListItemText inset={currentLocale !== btn[0]} primary={btn[1]} />
          </ListItemButton>
        ))}
      </List>
    </>
  );
}
