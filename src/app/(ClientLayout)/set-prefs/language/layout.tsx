import { Metadata } from "next";
import { PropsWithChildren } from "react";
export const metadata: Metadata = { title: "Setel Bahasa & Wilayah" };
export default function LanguageRootLayout(props: PropsWithChildren) {
  return props.children && props.children;
}
