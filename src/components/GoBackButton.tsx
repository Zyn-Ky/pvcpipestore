"use client";
import { ChevronLeftSharp } from "@mui/icons-material";
import {
  ButtonBase,
  Collapse,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import { useGeneralFunction } from "./base/GeneralWrapper";
import { memo, ReactNode } from "react";
const CustBtn = styled(ButtonBase)<{ href?: string }>(({ theme }) => ({
  fontWeight: "bold",
  padding: 6,
  border: `1px solid ${theme.palette.text.primary}`,
}));
export default memo(function GoBackButton({
  title,
  extendNode,
  className,
  btnClassName,
}: {
  title?: string;
  extendNode?: ReactNode;
  className?: string;
  btnClassName?: string;
}) {
  const router = useRouter();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { baseManager } = useGeneralFunction();
  const showButton =
    isSmallScreen && baseManager.PreviousPathname !== undefined;
  return (
    <>
      <Collapse
        in={showButton}
        orientation={extendNode ? "horizontal" : "vertical"}
        mountOnEnter
        unmountOnExit
        className={` ${className && ` ${className}`}`}
      >
        <div
          className={`w-full mb-1 flex items-center ${
            className && ` ${className}`
          }`}
        >
          <div className={`${btnClassName && ` ${btnClassName}`}`}>
            <CustBtn
              className={`rounded-3xl min-h-9 ${extendNode && "mr-4"}`}
              draggable={false}
              focusRipple
              onClick={(e) => {
                e.preventDefault();
                router.back();
              }}
            >
              <ChevronLeftSharp
                className={`${title && "mr-2"}`}
                fontSize="medium"
              />
              {title && <span className="mr-2">{title}</span>}
            </CustBtn>
          </div>
          {extendNode && extendNode}
        </div>
      </Collapse>
      {!showButton && extendNode && <div className="">{extendNode}</div>}
    </>
  );
});
