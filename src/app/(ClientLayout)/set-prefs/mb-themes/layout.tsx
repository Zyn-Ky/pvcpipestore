import { Metadata } from "next";
import { PropsWithChildren } from "react";
export const metadata: Metadata = { title: "Setel Tampilan Tema" };

export default function ThemeSettingsUI(props: PropsWithChildren) {
  return props.children && props.children;
}
