"use client";
// import {
//   Search,
//   SearchIconWrapper,
//   StyledInputBase,
// } from "@/components/custom/UXNavbar/BetterSearchBar";
import { useTheme } from "@mui/material";
import Image from "next/image";
import LogoMonochrome from "../../assets/logo-monochrome.webp";
import LogoColorful from "../../assets/logo-colorful.webp";
import NextLink from "next/link";
import dynamic from "next/dynamic";
const Search = dynamic(
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
export default function LogoModule() {
  const themes = useTheme();
  return (
    <>
      <NextLink href="/" shallow>
        {themes.palette.mode === "dark" ? (
          <Image src={LogoMonochrome} width={130} alt="Logo SIB" priority />
        ) : (
          <Image src={LogoColorful} width={160} alt="Logo SIB" priority />
        )}
      </NextLink>
    </>
  );
}
