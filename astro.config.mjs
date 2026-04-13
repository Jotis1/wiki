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
		},
		{
			provider: fontProviders.fontsource(),
			name: "Geist Mono",
			cssVariable: "--font-geist-mono",
		},
		{
			provider: fontProviders.fontsource(),
			name: "Merriweather",
			cssVariable: "--font-merriweather",
		},
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
