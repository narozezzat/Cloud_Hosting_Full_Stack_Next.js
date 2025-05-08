"use client";
import { ConfigProvider } from "antd";
import { ConfigProviderProps } from "antd/lib/config-provider";
import { PropsWithChildren } from "react";

export const themeColors = {
  blue: {
    "dark-1": "#1d149a",
    "dark-2": "#202551",
    "light-1": "#f5faff",
    "light-2": "#D9E8FC",
    DEFAULT: "#2419be",
  },
  text: {
    body: "#0e1024de",
    heading: "#0E1024",
  },
  green: {
    "light-1": "#edf7ee",
    "light-2": "#CDE9CE",
    dark: "#1e4620",
    DEFAULT: "#4caf50",
  },
  gray: {
    "dark-1": "#CFCFCF",
    "light-1": "#f5f5f5",
    "light-2": "#E5E5E5",
    dark: "#616161",
    DEFAULT: "#9e9e9e",
  },
  orange: {
    DEFAULT: "#FF9500",
  },
  primary: {
    DEFAULT: "#000",
  },
  error: "#ff4d4f",
  warning: {
    "light-1": "#FFF7E1",
    DEFAULT: "#FFC043",
  },
  reservedInactive: "#F59E0B",
  contracted: "#581a85",
};

const theme: ConfigProviderProps["theme"] = {
  token: {
    borderRadius: 4,
    borderRadiusLG: 6,
    borderRadiusSM: 2,
    borderRadiusXS: 12,
    colorError: themeColors.error,
    colorInfo: themeColors.gray.DEFAULT,
    colorPrimary: themeColors.primary.DEFAULT,
    colorPrimaryBg: themeColors.gray["light-1"],
    colorSuccess: themeColors.green.DEFAULT,
    fontSize: 14,
    wireframe: true,
  },
  components: {
    Table: { rowSelectedHoverBg: themeColors.gray["light-2"] },
  },
};

const AntThemeProvider = ({ children }: PropsWithChildren): JSX.Element => {
  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
};

export default AntThemeProvider;
