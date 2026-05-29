"use client";

import { ConfigProvider, theme as antdTheme } from "antd";
import { useTheme } from "next-themes";
import { PropsWithChildren, useEffect, useState } from "react";

/**
 * Antd ConfigProvider synced to our design tokens.
 * Reads the current next-themes mode and maps brand/accent/semantic tokens
 * so Antd primitives (Tables, Buttons, Modals, Dropdowns) match the rest of the app.
 */
export default function AntdThemeProvider({ children }: PropsWithChildren) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: isDark ? "#608EF6" : "#3B6FE8",
          colorInfo: isDark ? "#608EF6" : "#3B6FE8",
          colorSuccess: "#10B981",
          colorWarning: "#F59E0B",
          colorError: "#EF4444",
          colorBgBase: isDark ? "#0B1220" : "#FFFFFF",
          colorTextBase: isDark ? "#F1F5F9" : "#0B1220",
          borderRadius: 12,
          borderRadiusLG: 16,
          borderRadiusSM: 8,
          borderRadiusXS: 6,
          fontFamily: "var(--font-sans), system-ui, sans-serif",
          fontSize: 14,
          controlHeight: 40,
          wireframe: false,
        },
        components: {
          Button: {
            controlHeight: 40,
            fontWeight: 600,
            primaryShadow: "none",
          },
          Table: {
            headerBg: isDark ? "#161F33" : "#F7F9FC",
            headerColor: isDark ? "#CBD5E1" : "#1F2A44",
            rowHoverBg: isDark ? "#1E293B" : "#EEF4FF",
            borderColor: isDark ? "#334155" : "#E2E8F0",
            headerSplitColor: "transparent",
          },
          Modal: {
            borderRadiusLG: 20,
          },
          Dropdown: {
            borderRadiusLG: 12,
          },
          Input: {
            controlHeight: 44,
            borderRadius: 12,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
