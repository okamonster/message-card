"use client";

import { useEffect, useRef } from "react";
import { showNotification, hideNotification } from "@mantine/notifications";
import { useToast } from "@/hooks/useToast";

export default function ServiceWorkerRegister() {
  const deferredPromptRef = useRef<any>(null);
  const { showSuccessToast } = useToast();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    const register = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });

        if (registration.waiting) {
          registration.waiting.postMessage({ type: "SKIP_WAITING" });
        }

        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (!newWorker) return;
          newWorker.addEventListener("statechange", () => {
            // インストール完了後に更新がある場合は、必要ならトースト等で通知可能
          });
        });
      } catch (_) {
        // ignore registration errors
      }
    };

    register();
  }, []);

  // PWA インストール促進トースト
  useEffect(() => {
    if (typeof window === "undefined") return;

    // すでにインストール済み（表示モードが standalone）の場合は何もしない
    const isStandalone =
      window.matchMedia &&
      window.matchMedia("(display-mode: standalone)").matches;
    // iOS Safari 独自判定
    const isIosStandalone = (window as any).navigator?.standalone === true;
    if (isStandalone || isIosStandalone) return;

    const onBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      deferredPromptRef.current = e;

      const id = "pwa-install-notification";
      showNotification({
        id,
        title: "アプリをインストールできます",
        message: (
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span>ホーム画面に追加して、オフラインでも使えます。</span>
            <button
              onClick={async () => {
                const promptEvent = deferredPromptRef.current;
                if (!promptEvent) return;
                try {
                  await promptEvent.prompt();
                  const choice = await promptEvent.userChoice;
                  if (choice?.outcome === "accepted") {
                    showSuccessToast("インストールを開始しました");
                  }
                } finally {
                  deferredPromptRef.current = null;
                  hideNotification(id);
                }
              }}
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                border: "none",
                background: "var(--button-primary-color)",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              インストール
            </button>
          </div>
        ),
        autoClose: false,
        withCloseButton: true,
      });
    };

    const onAppInstalled = () => {
      showSuccessToast("インストールが完了しました");
      deferredPromptRef.current = null;
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, [showSuccessToast]);

  return null;
}
