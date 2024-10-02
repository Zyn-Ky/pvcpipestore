import localFont from "next/font/local";

export const YTSans = localFont({
  src: [
    {
      path: "./yt-sans/YouTubeSansBlack.woff2",
      weight: "normal",
      style: "normal",
    },
    {
      path: "./yt-sans/YouTubeSansBold.woff2",
      style: "normal",
      weight: "bold",
    },
    {
      path: "./yt-sans/YouTubeSansExtrabold.woff2",
      weight: "bold",
      style: "normal",
    },
    {
      path: "./yt-sans/YouTubeSansLight.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./yt-sans/YouTubeSansMedium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./yt-sans/YouTubeSansRegular.woff2",
      weight: "normal",
      style: "normal",
    },
    {
      path: "./yt-sans/YouTubeSansSemibold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-yt-sans-default",
});

export const YTSansDark = localFont({
  src: [
    {
      path: "./yt-sans/YouTubeSansDarkBlack.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "./yt-sans/YouTubeSansDarkBold.woff2",
      weight: "bold",
      style: "normal",
    },
    {
      path: "./yt-sans/YouTubeSansDarkExtrabold.woff2",
      weight: "bold",
      style: "normal",
    },
    {
      path: "./yt-sans/YouTubeSansDarkLight.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./yt-sans/YouTubeSansDarkMedium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./yt-sans/YouTubeSansDarkRegular.woff2",
      weight: "normal",
      style: "normal",
    },
    {
      path: "./yt-sans/YouTubeSansDarkSemibold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-yt-sans-dark",
});
