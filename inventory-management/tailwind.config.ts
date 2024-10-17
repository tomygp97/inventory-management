import type { Config } from "tailwindcss";
import { createThemes } from "tw-colors";
import colors from "tailwindcss/colors";

const baseColors: Record<string, ColorMap> = {
  gray: {
    50: '#f9fafb', // bg-gray-50
    100: '#f3f4f6', // bg-gray-100
    200: '#e5e7eb', // bg-gray-200
    300: '#d1d5db', // bg-gray-300
    400: '#9ca3af', // bg-gray-400
    500: '#6b7280', // bg-gray-500
    600: '#4b5563', // bg-gray-600
    700: '#374151', // bg-gray-700
    800: '#1f2937', // bg-gray-800
    900: '#111827', // bg-gray-900
  },
  red: {
    50: '#fef2f2', // bg-red-50
    100: '#fee2e2', // bg-red-100
    200: '#fecaca', // bg-red-200
    300: '#fca5a5', // bg-red-300
    400: '#f87171', // bg-red-400
    500: '#ef4444', // bg-red-500
    600: '#dc2626', // bg-red-600
    700: '#b91c1c', // bg-red-700
    800: '#991b1b', // bg-red-800
    900: '#7f1d1d', // bg-red-900
  },
  yellow: {
    50: '#fffbeb', // bg-yellow-50
    100: '#fef3c7', // bg-yellow-100
    200: '#fde68a', // bg-yellow-200
    300: '#fcd34d', // bg-yellow-300
    400: '#fbbf24', // bg-yellow-400
    500: '#f59e0b', // bg-yellow-500
    600: '#d97706', // bg-yellow-600
    700: '#b45309', // bg-yellow-700
    800: '#92400e', // bg-yellow-800
    900: '#78350f', // bg-yellow-900
  },
  green: {
    50: '#f0fdf4', // bg-green-50
    100: '#dcfce7', // bg-green-100
    200: '#bbf7d0', // bg-green-200
    300: '#86efac', // bg-green-300
    400: '#4ade80', // bg-green-400
    500: '#22c55e', // bg-green-500
    600: '#16a34a', // bg-green-600
    700: '#15803d', // bg-green-700
    800: '#166534', // bg-green-800
    900: '#14532d', // bg-green-900
  },
  blue: {
    50: '#eff6ff', // bg-blue-50
    100: '#dbeafe', // bg-blue-100
    200: '#bfdbfe', // bg-blue-200
    300: '#93c5fd', // bg-blue-300
    400: '#60a5fa', // bg-blue-400
    500: '#3b82f6', // bg-blue-500
    600: '#2563eb', // bg-blue-600
    700: '#1d4ed8', // bg-blue-700
    800: '#1e40af', // bg-blue-800
    900: '#1e3a8a', // bg-blue-900
  },
  indigo: {
    50: '#eef2ff', // bg-indigo-50
    100: '#e0e7ff', // bg-indigo-100
    200: '#c7d2fe', // bg-indigo-200
    300: '#a5b4fc', // bg-indigo-300
    400: '#818cf8', // bg-indigo-400
    500: '#6366f1', // bg-indigo-500
    600: '#4f46e5', // bg-indigo-600
    700: '#4338ca', // bg-indigo-700
    800: '#3730a3', // bg-indigo-800
    900: '#312e81', // bg-indigo-900
  },
  purple: {
    50: '#f5f3ff', // bg-purple-50
    100: '#ede9fe', // bg-purple-100
    200: '#ddd6fe', // bg-purple-200
    300: '#c4b5fd', // bg-purple-300
    400: '#a78bfa', // bg-purple-400
    500: '#8b5cf6', // bg-purple-500
    600: '#7c3aed', // bg-purple-600
    700: '#6d28d9', // bg-purple-700
    800: '#5b21b6', // bg-purple-800
    900: '#4c1d95', // bg-purple-900
  },
  pink: {
    50: '#fdf2f8', // bg-pink-50
    100: '#fce7f3', // bg-pink-100
    200: '#fbcfe8', // bg-pink-200
    300: '#f9a8d4', // bg-pink-300
    400: '#f472b6', // bg-pink-400
    500: '#ec4899', // bg-pink-500
    600: '#db2777', // bg-pink-600
    700: '#be185d', // bg-pink-700
    800: '#9d174d', // bg-pink-800
    900: '#831843', // bg-pink-900
  },
};

const shadeMapping = {
  "50": "900",
  "100": "800",
  "200": "700",
  "300": "600",
  "400": "500",
  "500": "400",
  "600": "300",
  "700": "200",
  "800": "100",
  "900": "50",
};

interface ColorMap {
  [key: string]: string;
}

interface Theme {
  [key: string]: ColorMap;
}

const generateThemeObject = (colors: Record<string, ColorMap>, mapping: ColorMap, invert = false): Theme => {
  const theme: Theme = {};
  for (const color in baseColors) {
    theme[color] = {};
    for (const [key, value] of Object.entries(mapping)) {
      const shadeKey = invert ? value : key;
      theme[color][key] = colors[color][shadeKey];
    }
  }
  return theme;
};

const lightTheme = generateThemeObject(baseColors, shadeMapping);
const darkTheme = generateThemeObject(baseColors, shadeMapping, true);

const themes = {
  light: {
    ...lightTheme,
    white: "#ffffff",
  },
  dark: {
    ...darkTheme,
    white: colors.gray["950"],
  },
};

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [createThemes(themes)],
};

export default config;
