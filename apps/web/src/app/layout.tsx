import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import "./globals.css";
import "@/styles/variables.css";
import styles from "./layout.module.css";
import { Metadata, Viewport } from "next";
import { EventProvider } from "@/features/event/EventProvider";

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
        </MantineProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "あかりちゃん生誕メッセージカード2025",
  description: "あかりちゃん生誕メッセージカード2025",
  icons: {
    icon: "/images/favicon.ico",
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
