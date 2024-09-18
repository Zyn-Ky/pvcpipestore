import { Divider, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import Link from "next/link";
import { Fragment, memo, ReactNode } from "react";

type menus = {
  items: {
    href?: string;
    onClick?: () => void;
    text: ReactNode;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    disableClosePopupOnClick?: boolean;
    disabled?: boolean;
    hidden?: boolean;
    inset?: boolean;
    disableRipple?: boolean;
    disableTouchRipple?: boolean;
    disableGutters?: boolean;
  }[][];
  handleClosePopup: () => void;
};

export const Menus = memo(function Menus(props: menus) {
  return (
    <>
      {props.items &&
        props.items
          .filter((child) => child.length !== 0)
          .map((parentItem, parentIndex) => (
            <Fragment key={`MENU_PARENT_GROUP_${parentIndex}`}>
              {parentItem.map((item, i) =>
                item.hidden === true ? null : item.href ? (
                  <MenuItem
                    onClick={(e) => {
                      if (item.disableClosePopupOnClick !== true)
                        props.handleClosePopup && props.handleClosePopup();
                      item.onClick && item.onClick();
                    }}
                    component={Link}
                    key={`PARENT_${parentIndex}_ITEM_${i}`}
                    href={item.href}
                    disabled={item.disabled}
                    disableRipple={item.disableRipple ?? false}
                    disableTouchRipple={item.disableTouchRipple ?? false}
                    disableGutters={item.disableGutters ?? false}
                    autoFocus={parentIndex === 0 && i === 0}
                  >
                    {item.startIcon && (
                      <ListItemIcon>{item.startIcon}</ListItemIcon>
                    )}
                    <ListItemText>{item.text && item.text}</ListItemText>
                    {item.endIcon && item.endIcon}
                  </MenuItem>
                ) : (
                  <MenuItem
                    onClick={() => {
                      if (item.disableClosePopupOnClick !== true)
                        props.handleClosePopup && props.handleClosePopup();
                      item.onClick && item.onClick();
                    }}
                    key={`PARENT_${parentIndex}_ITEM_${i}`}
                    disabled={item.disabled}
                    disableRipple={item.disableRipple ?? false}
                    disableTouchRipple={item.disableTouchRipple ?? false}
                    disableGutters={item.disableGutters ?? false}
                    autoFocus={parentIndex === 0 && i === 0}
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
                parentIndex !== props.items.length - 1 &&
                props.items[parentIndex + 1].filter((item) => item.hidden)
                  .length !== props.items[parentIndex + 1].length && (
                  <>
                    <Divider
                      className="mt-4"
                      key={`PARENT_MENU_DIVIDER_${parentIndex}`}
                    />
                  </>
                )}
            </Fragment>
          ))}
    </>
  );
});
