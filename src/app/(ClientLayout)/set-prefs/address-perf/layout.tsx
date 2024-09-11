import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = { title: "Setel Alamat Pengiriman" };
export default function AddressRootLayout(props: PropsWithChildren) {
  return props.children && props.children;
}
