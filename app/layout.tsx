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
  title: "Bliss Point | Menú Digital",
  description:
    "El punto justo para disfrutar algo rico. Panchos, hamburguesas, papas y bebidas. Bartolomé Mitre 133, San Nicolás de los Arroyos, Buenos Aires.",
  icons: {
    icon: [
      { url: "/assets/favicon/favicon.ico", sizes: "any" },
      { url: "/assets/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/assets/favicon/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/assets/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/assets/favicon/favicon.ico"],
  },
  manifest: "/assets/favicon/site.webmanifest",
  themeColor: "#0D0D0D",
};

const fontVars = {
  "--font-display": `${newscrash.style.fontFamily}, "Anton", sans-serif`,
  "--font-script": `${magicClover.style.fontFamily}, "Kaushan Script", cursive`,
  "--font-playful": `${gokartBubble.style.fontFamily}, ${baloo2.style.fontFamily}, cursive`,
  "--font-ui": `${baloo2.style.fontFamily}, sans-serif`,
} as React.CSSProperties;

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
        style={fontVars}
      >
        {children}
      </body>
    </html>
  );
}
