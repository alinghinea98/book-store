import type { APIRoute } from "astro";

export let cartItems: number[] = [];

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(cartItems), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const POST: APIRoute = async ({ request }) => {
  const { id } = await request.json();
  if (!cartItems.includes(id)) {
    cartItems.push(id);
  }
  
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const DELETE: APIRoute = async ({ request }) => {
  const { id } = await request.json();
  cartItems = cartItems.filter(itemId => itemId !== id);
  
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};