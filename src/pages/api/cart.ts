import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
	const body = await request.json();
	console.log("Add to cart:", body);
	return new Response(null, { status: 200 });
};
