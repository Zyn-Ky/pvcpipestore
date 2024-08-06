import { Divider, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

type menus = {
  items: {
    href?: string;
    onClick?: () => void;
    text: string;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    disableClosePopupOnClick?: boolean;
    disabled?: boolean;
    hidden?: boolean;
  }[][];
  handleClosePopup: () => void;
};

export function Menus(props: menus) {
  return (
    <>
      {props.items &&
        props.items.map((parentItem, i) => (
          <>
            {parentItem.map((item) =>
              item.hidden === true ? null : item.href ? (
                <Link
                  href={item.href}
                  passHref
                  key={`ITEM_${item.text.toUpperCase() ?? "UNDEFINED"}`}
                >
                  <MenuItem
                    onClick={() => {
                      if (item.disableClosePopupOnClick !== true)
                        props.handleClosePopup && props.handleClosePopup();
                      item.onClick && item.onClick();
                    }}
                    disabled={item.disabled}
                  >
                    {item.startIcon && (
                      <ListItemIcon>{item.startIcon}</ListItemIcon>
                    )}
                    <ListItemText>{item.text && item.text}</ListItemText>
                    {item.endIcon && item.endIcon}
                  </MenuItem>
                </Link>
              ) : (
                <MenuItem
                  onClick={() => {
                    if (item.disableClosePopupOnClick !== true)
                      props.handleClosePopup && props.handleClosePopup();
                    item.onClick && item.onClick();
                  }}
                  key={`ITEM_${item.text.toUpperCase() ?? "UNDEFINED"}`}
                  disabled={item.disabled}
                >
                  {item.startIcon && (
                    <ListItemIcon>{item.startIcon}</ListItemIcon>
                  )}
                  <ListItemText>{item.text && item.text}</ListItemText>
                  {item.endIcon && item.endIcon}
                </MenuItem>
              )
            )}
            {props.items.length > 1 &&
              i >= 0 &&
              i !== props.items.length - 1 && (
                <>
                  <Divider sx={{ my: 1 }} />
                </>
              )}
          </>
        ))}
    </>
  );
}
