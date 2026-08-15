import type { Metadata } from "next";
import localFont from "next/font/local";
import { Baloo_2 } from "next/font/google";
import "./globals.css";

const gokartBubble = localFont({
  src: "./fonts/GokartBubble.otf",
  variable: "--font-gokart",
  display: "swap",
});

const magicClover = localFont({
  src: "./fonts/MagicClover.otf",
  variable: "--font-magicclover",
  display: "swap",
});

const newscrash = localFont({
  src: "./fonts/Newscrash.otf",
  variable: "--font-newscrash",
  display: "swap",
});

const baloo2 = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-baloo2",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pancho Doto | Menú Digital",
  description:
    "Panchos gourmet desde 1999. Armá el tuyo con hasta 4 toppings de la barra. San Nicolás de los Arroyos y Villa Constitución.",
  icons: { icon: "/assets/brand/logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/fill/style.css"
        />
      </head>
      <body
        className={`${gokartBubble.variable} ${magicClover.variable} ${newscrash.variable} ${baloo2.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
