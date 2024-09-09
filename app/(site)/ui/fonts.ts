import { Noto_Sans_Mono, Roboto_Mono } from "next/font/google";
// Could also import a local font.
// ? import localFont from "next/font/local";

export const noto_sans_mono = Noto_Sans_Mono({
  subsets: ["latin"],
  // Add below property if using Tailwind.
  variable: "--font-noto_sans_mono",
});

export const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto_mono",
});

// This is how you would apply it as a variable.
// ? const roboto = localFont({
//   ? src: [
//     ? {
//       ? path: "./Roboto-Regular.woff2",
//       ? weight: "400",
//       ? style: "normal",
//     ? },
//     ? {
//       ? path: "./Roboto-Italic.woff2",
//       ? weight: "400",
//       ? style: "italic",
//     ? },
//     ? {
//       ? path: "./Roboto-Bold.woff2",
//       ? weight: "700",
//       ? style: "normal",
//     ? },
//     ? {
//       ? path: "./Roboto-BoldItalic.woff2",
//       ? weight: "700",
//       ? style: "italic",
//     ? },
//   ? ],
// ? });
