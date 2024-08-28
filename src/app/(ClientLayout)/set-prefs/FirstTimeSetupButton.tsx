"use client";
import {
  Collapse,
  Divider,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { useEffectOnce } from "react-use";
import PhonelinkSetupIcon from "@mui/icons-material/PhonelinkSetup";
import CloseIcon from "@mui/icons-material/Close";
export default function FirstTimeSetupButton() {
  const [showButton, setShowButton] = useState(false);
  const [ignored, setIgnored] = useState(false);
  useEffectOnce(() => {
    setShowButton(true);
  });
  return (
    showButton && (
      <Collapse in={!ignored} orientation="vertical">
        <>
          <ListItemButton
            LinkComponent={Link}
            href={"/set-prefs/oosetup"}
            key={`SETTINGS_BTN_SPECIAL_FIRST_TIME_SETUP`}
            data-disable-nprogress={true}
          >
            <ListItemIcon>
              <PhonelinkSetupIcon />
            </ListItemIcon>
            <ListItemText primary="Siapkan profil dan alamat Anda" />
            <ListItemIcon
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setIgnored(true);
                }}
              >
                <CloseIcon />
              </IconButton>
            </ListItemIcon>
          </ListItemButton>
          <Divider className="my-8" />
        </>
      </Collapse>
    )
  );
}
