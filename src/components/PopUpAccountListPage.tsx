import { Divider, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import Link from "next/link";
import { Fragment, memo, ReactNode } from "react";

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
    inset?: boolean;
  }[][];
  handleClosePopup: () => void;
};

export const Menus = memo(function Menus(props: menus) {
  return (
    <>
      {props.items &&
        props.items.map((parentItem, i) => (
          <Fragment key={`MENU_PARENT_GROUP_${i}`}>
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
                  <ListItemText inset={item.inset ?? false}>
                    {item.text && item.text}
                  </ListItemText>
                  {item.endIcon && item.endIcon}
                </MenuItem>
              )
            )}
            {props.items.length > 1 &&
              i !== props.items.length - 1 &&
              props.items[i + 1].filter((item) => item.hidden).length !==
                props.items[i + 1].length && (
                <>
                  <Divider sx={{ my: 1 }} key={`PARENT_MENU_DIVIDER_${i}`} />
                </>
              )}
          </Fragment>
        ))}
    </>
  );
});
