// @ts-check

import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

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
	vite: {
		plugins: [tailwindcss()],
	},
});
