import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Keranjang`,
};

export default function CartRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children && children}</>;
}
