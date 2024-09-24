"use client";
import { useGeneralFunction } from "@/components/base/GeneralWrapper";
import GoBackButton from "@/components/GoBackButton";
import { getClientLocale, setClientLocale } from "@/libs/clientLocale";
import CheckIcon from "@mui/icons-material/Check";
import {
  Alert,
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useEffectOnce, useUpdateEffect } from "react-use";

export default function LanguageSelector() {
  const t_settingspage = useTranslations("SETTINGS_PAGE");
  const { languageManager } = useGeneralFunction();
  const [showRefreshRequiredPopup, setShowRefreshRequiredPopup] =
    useState(false);

  return (
    <>
      <Collapse in={showRefreshRequiredPopup} orientation="vertical">
        <Alert
          variant="outlined"
          color="warning"
          className="mb-4"
          action={
            <>
              <Button
                size="small"
                variant="contained"
                color="warning"
                onClick={() => window.location.reload()}
              >
                Refresh
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="warning"
                onClick={() => setShowRefreshRequiredPopup(false)}
              >
                Ignore
              </Button>
            </>
          }
        >
          Page refresh required!
        </Alert>
      </Collapse>
      <GoBackButton
        title={t_settingspage("SIDEBAR_TITLE")}
        extendNode={
          <>
            <Typography variant="h4" component="h1" fontWeight="bold">
              Bahasa
            </Typography>
          </>
        }
      />

      <List component="nav">
        {[
          ["id-ID", "Bahasa Indonesia"],
          ["en-US", "English"],
        ].map((btn) => (
          <ListItemButton
            key={`SETTINGS_BTN_${btn[1]}`}
            onClick={() => {
              languageManager.setUserLocale(btn[0]);
              setShowRefreshRequiredPopup(true);
            }}
            disabled={showRefreshRequiredPopup}
          >
            {languageManager.currentUserLocale === btn[0] && (
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
            )}
            <ListItemText
              inset={languageManager.currentUserLocale !== btn[0]}
              primary={btn[1]}
            />
          </ListItemButton>
        ))}
      </List>
    </>
  );
}
