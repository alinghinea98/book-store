import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const items = body.items as number[];
        if (!Array.isArray(items) || items.some(id => typeof id !== "number")) {
            return new Response(JSON.stringify({
                success: false,
                message: "Invalid payload: items must be an array of numbers."
            }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }
        console.log("Checkout processed for ids:", items);
        return new Response(JSON.stringify({
            success: true,
            message: "Checkout complete",
            purchasedItems: items
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error("Checkout API error:", error);
        return new Response(JSON.stringify({
            success: false,
            message: "Internal server error"
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};
