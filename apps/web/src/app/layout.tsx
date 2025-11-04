import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import "./globals.css";
import "@/styles/variables.css";
import styles from "./layout.module.css";
import { Metadata, Viewport } from "next";
import { EventProvider } from "@/features/event/EventProvider";
import ServiceWorkerRegister from "./_components/ServiceWorkerRegister";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={styles.container}>
        <MantineProvider>
          <Notifications position="top-center" />
          <EventProvider title={"akari-birthday-2025"}>
            <main className={styles.main}>{children}</main>
          </EventProvider>
          <ServiceWorkerRegister />
        </MantineProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "あかりちゃん生誕メッセージカード2025",
  description: "あかりちゃん生誕メッセージカード2025",
  icons: {
    icon: [
      { url: "/images/favicon.ico" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      {
        url: "/icons/apple-touch-icon-180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  themeColor: "#ffffff",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "あかりちゃん生誕メッセージカード2025",
  },
  openGraph: {
    title: "あかりちゃん生誕メッセージカード2025",
    description: "あかりちゃん生誕メッセージカード2025",
    images: ["/images/ogp.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "あかりちゃん生誕メッセージカード2025",
    description: "あかりちゃん生誕メッセージカード2025",
    images: ["/images/ogp.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};
