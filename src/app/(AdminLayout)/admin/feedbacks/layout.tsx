import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedbacks",
};

export default async function FeedbacksPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children && children;
}
