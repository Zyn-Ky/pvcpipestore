"use client";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "@/components/custom/UXNavbar/BetterSearchBar";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useTheme } from "@mui/material";
import Image from "next/image";
import LogoMonochrome from "../../assets/logo-monochrome.webp";
import LogoColorful from "../../assets/logo-colorful.webp";
import NextLink from "next/link";

export default function LogoAndSearchModule() {
  const themes = useTheme();
  return (
    <>
      <NextLink href="/" shallow>
        {themes.palette.mode === "dark" ? (
          <Image src={LogoMonochrome} width={130} alt="Logo SIB" />
        ) : (
          <Image src={LogoColorful} width={160} alt="Logo SIB" />
        )}
      </NextLink>
      <Search sx={{ ml: 2 }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
    </>
  );
}
