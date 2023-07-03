/// <reference types="vite/client" />
/// <reference types="vitest" />

import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import mkcert from "vite-plugin-mkcert";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react-swc";
// import { sentryVitePlugin } from "@sentry/vite-plugin";

export default defineConfig({
  plugins: [
    mkcert(),
    //@ts-ignore
    svgr({
      svgrOptions: {
        namedExport: "RC",
      },
    }),
    react(),
    VitePWA({
      includeAssets: [
        "assets/logo-64.png",
        "assets/logo-310.png",
        "assets/cards.png",
        "assets/world.png",
        "assets/profile.png",
      ],
      injectRegister: "auto",
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      manifest: {
        name: "Discover WEFA",
        short_name: "WEFA",
        icons: [
          {
            src: "assets/logo-64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "assets/logo-310.png",
            sizes: "192X192",
            type: "image/png",
          },
          {
            src: "assets/logo-310.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        start_url: "/",
        display: "fullscreen",
        theme_color: "#38bdf8",
        background_color: "#f0fdfa",
        shortcuts: [
          {
            name: "Deck",
            description: "Open Plant and Creature Wefadex",
            url: "/deck",
            icons: [
              {
                src: "assets/cards.png",
                sizes: "64x64",
                type: "image/png",
              },
            ],
          },
          {
            name: "Explore",
            description: "Explore the World",
            url: "/explore",
            icons: [
              {
                src: "assets/world.png",
                sizes: "64x64",
                type: "image/png",
              },
            ],
          },
          {
            name: "Profile",
            description: "View accomplishments and stats",
            url: "/profile",
            icons: [
              {
                src: "assets/profile.png",
                sizes: "64x64",
                type: "image/png",
              },
            ],
          },
        ],
      },
    }),
    // sentryVitePlugin({
    //   org: "wefa",
    //   project: "app",
    //   // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
    //   // and need `project:releases` and `org:read` scopes
    //   authToken: import.meta.env.SENTRY_AUTH_TOKEN,
    // }),
  ],
  server: {
    port: 3000,
    fs: {
      strict: false,
    },
  },
  build: {
    target: "es2022",
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/__tests__/setup.ts",
    css: true,
  },
});
