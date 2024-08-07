import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Nuxt 4 directory structure and features
  // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
  // Nuxt Modules
  // https://nuxt.com/modules
  modules: [
    "@nuxthub/core",
    "@nuxtjs/tailwindcss",
    "@nuxt/icon",
    "@nuxtjs/supabase",
    "@nuxt/eslint",
  ],
  icon: {
    provider: "iconify",
  },
  // Prevents supabase from locking unauthenticated users to only the login page
  supabase: {
    redirect: false,
  },
  css: ["@/public/assets/css/global.css"],
  hub: {
    database: true,
    kv: true,
    blob: true,
    cache: true,
  },
  nitro: {
    prerender: {
      autoSubfolderIndex: false,
    },
    experimental: {
      // Enable Server API documentation within NuxtHub
      openAPI: true,
    },
  },
  // Development
  devtools: { enabled: true },
  dir: {
    pages: "app/pages",
    layouts: "app/layouts",
    middleware: "app/middleware",
  },
  components: {
    dirs: [
      {
        path: "app/components",
        global: true,
      },
      "app/components",
    ],
  },
  imports: {
    dirs: ["types/*.ts", "types/**/*.ts", "app/composables"],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        baseUrl: ".",
        paths: {
          "~/types/*": ["./types/*"],
          "~/server/*": ["./server/*"],
        },
      },
    },
  },
});
