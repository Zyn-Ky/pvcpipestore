import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post Product",
};

export default async function PostPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children && children;
}
