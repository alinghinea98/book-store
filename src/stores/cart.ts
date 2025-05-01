import { createSignal, createResource } from "solid-js";

export const [cartItems, setCartItems] = createSignal<number[]>([]);

export const addToCart = async (id: number) => {
  if (cartItems().includes(id)) return;
  
  setCartItems([...cartItems(), id]);
  
  try {
    await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    setCartItems(cartItems().filter(itemId => itemId !== id));
  }
};

export const removeFromCart = async (id: number) => {
  const prevItems = cartItems();
  
  setCartItems(cartItems().filter(itemId => itemId !== id));
  
  try {
    await fetch("/api/cart", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    setCartItems(prevItems);
  }
};

export const fetchCartItemsFromApi = async () => {
  try {
    const base = import.meta.env.SITE ?? "http://localhost:4321";
    const res = await fetch(`${base}/api/cart`);
    const items = await res.json();
    setCartItems(items);
    return items;
  } catch (error) {
    console.error("Failed to fetch cart items:", error);
    return [];
  }
};

export const [cartResource] = createResource(fetchCartItemsFromApi);

export const clearCart = async () => {
  try {
    await fetch("/api/cart/clear", {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });
    setCartItems([]);
  } catch (error) {
    console.error("Failed to clear cart:", error);
  }
};