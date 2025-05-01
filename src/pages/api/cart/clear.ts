import type { APIRoute } from "astro";
import { cartItems } from "../cart";

export const POST: APIRoute = async () => {
  cartItems.length = 0;
  
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};