import { Metadata } from "next";

export const metadata: Metadata = { title: "Kelola Akun" };

export default async function AccountsPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children && children;
}
