import { getEntry } from "astro:content";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {
	try {
		const slug = params?.slug;

		if (!slug || typeof slug !== "string") {
			return new Response("Missing or invalid slug", {
				status: 400,
				headers: {
					"Content-Type": "text/plain; charset=utf-8",
				},
			});
		}

		const post = await getEntry("wiki", slug);

		if (!post?.body) {
			return new Response("Not found", {
				status: 404,
				headers: {
					"Content-Type": "text/plain; charset=utf-8",
				},
			});
		}

		const url = new URL(request.url);
		const shouldDownload = url.searchParams.get("download") === "true";

		let safeSlug: string | string[] = slug.split("/");
		safeSlug = safeSlug[safeSlug.length - 1];
		const filename = `${safeSlug || "wiki"}.md`;

		const headers: Record<string, string> = {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, max-age=60, stale-while-revalidate=300",
		};

		if (shouldDownload) {
			headers["Content-Disposition"] =
				`attachment; filename="${filename}"`;
		}

		return new Response(post.body, {
			status: 200,
			headers,
		});
	} catch (error) {
		console.error("GET /wiki error:", error);

		return new Response("Internal Server Error", {
			status: 500,
			headers: {
				"Content-Type": "text/plain; charset=utf-8",
			},
		});
	}
};
