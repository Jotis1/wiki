import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const wikiPostSchema = z.object({
	title: z.string(),
	description: z.string(),
	slug: z.string().optional(),
});

const wikiPostLoader = glob({
	base: "./src/content/wiki",
	pattern: "**/*.{md,mdx}",
});

const wiki = defineCollection({
	loader: wikiPostLoader,
	schema: wikiPostSchema,
});

export const collections = { wiki };
