// @ts-check

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  fonts: [
      {
          provider: fontProviders.fontsource(),
          name: "Geist",
          cssVariable: "--font-geist-sans",
          weights: [100, 200, 300, 400, 50, 600, 700, 800, 900],
      },
      {
          provider: fontProviders.fontsource(),
          name: "Geist Mono",
          cssVariable: "--font-geist-mono",
          weights: [100, 200, 300, 400, 50, 600, 700, 800, 900],
      },
      {
          provider: fontProviders.fontsource(),
          name: "Merriweather",
          cssVariable: "--font-merriweather",
          weights: [100, 200, 300, 400, 50, 600, 700, 800, 900],
      },
	],

  markdown: {
      shikiConfig: {
          theme: "github-light",
      },
	},

  vite: {
      plugins: [tailwindcss()],
	},

  integrations: [react()],
  output: "server",

  adapter: node({
    mode: "standalone",
  }),
});