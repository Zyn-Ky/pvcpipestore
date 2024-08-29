"use client";
import { Button, Portal, useTheme } from "@mui/material";
import { css } from "@emotion/css";
import { useState } from "react";
import { useDebounce } from "react-use";
import SearchIcon from "@mui/icons-material/Search";
import {
  SearchButtonConsumer,
  SearchButtonProvider,
  SearchModal,
} from "./base/SearchAnimated";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { SearchBox } from "react-instantsearch";
import ProtectedHiddenDevelopmentComponent from "./base/ProtectedHiddenDevComponent";
const SearchInput = dynamic(
  async () =>
    (await import("@/components/custom/UXNavbar/BetterSearchBar")).Search
);
const SearchIconWrapper = dynamic(
  async () =>
    (await import("@/components/custom/UXNavbar/BetterSearchBar"))
      .SearchIconWrapper
);
const StyledInputBase = dynamic(
  async () =>
    (await import("@/components/custom/UXNavbar/BetterSearchBar"))
      .StyledInputBase
);

export default function SearchButton() {
  const [opened, setOpened] = useState(false);
  const theme = useTheme();
  const text = useTranslations("BASE");
  const [searchVal, setSearchVal] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  useDebounce(
    () => {
      setDebouncedSearchValue(searchVal);
    },
    2000,
    [searchVal]
  );
  const buttonStyles = css`
    background-color: ${theme.palette.mode === "dark"
      ? theme.palette.primary.dark
      : theme.palette.primary.main};
    color: ${theme.palette.common.white};
  `;
  const bodyColorStyles = css`
    background-color: ${theme.palette.background.paper};
    color: ${theme.palette.text.primary};
  `;
  const buttonClassnames = `px-8 py-2 flex items-center text-base justify-center gap-3 border-0 cursor-pointer rounded-3xl  ${buttonStyles}`;
  return (
    <SearchButtonProvider borderRadiusBtn="24px" duration={0.45}>
      <SearchButtonConsumer>
        {({ searchButtonRef, triggerSearchButton, opened }) => (
          <>
            <button
              ref={searchButtonRef}
              className={`${buttonClassnames} overflow-hidden will-change-[transform,top,left,width,height,border-radius] z-muiModal`}
              onClick={() => {
                triggerSearchButton();
                setOpened(opened);
              }}
            >
              <SearchIcon />
              {text("SEARCH_TEXT")}
            </button>
            <Portal
              container={() => document.getElementById("down") ?? document.body}
            >
              <SearchModal
                searchButtonCloneNode={
                  <>
                    <button
                      className={`${buttonClassnames} mx-0 absolute inset-0 h-full overflow-hidden will-change-[transform,top,left,width,height,border-radius] z-muiModal`}
                    >
                      <SearchIcon />
                      {text("SEARCH_TEXT")}
                    </button>
                  </>
                }
                className={`${bodyColorStyles}`}
                contentProps={{ className: "p-16" }}
              >
                <div className="flex justify-end">
                  <Button onClick={() => triggerSearchButton(false)}>
                    Tutup
                  </Button>
                </div>
                <h1 className="text-3xl font-bold">
                  Cari produk dan lain-lainnya
                </h1>
                <ProtectedHiddenDevelopmentComponent>
                  <SearchInput className="ml-8">
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder={text("SEARCH_TEXT")}
                      inputProps={{ "aria-label": text("SEARCH_TEXT") }}
                      value={searchVal}
                      onChange={({ currentTarget }) => {
                        setSearchVal(currentTarget.value);
                      }}
                    />
                  </SearchInput>
                  <SearchBox />
                </ProtectedHiddenDevelopmentComponent>
              </SearchModal>
            </Portal>
          </>
        )}
      </SearchButtonConsumer>
    </SearchButtonProvider>
  );
}
