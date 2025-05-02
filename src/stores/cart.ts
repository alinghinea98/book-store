import { createSignal } from "solid-js";

export const [cartItems, setCartItems] = createSignal<number[]>([]);

export const addToCart = (id: number) => {
  if (!cartItems().includes(id)) {
    setCartItems([...cartItems(), id]);
  }
};

export const removeFromCart = (id: number) => {
  setCartItems(cartItems().filter(itemId => itemId !== id));
};

export const clearCart = () => {
  setCartItems([]);
};

export const fetchCartItemsFromApi = async () => {
  return cartItems();
}

export const checkout = async () => {
  const items = cartItems(); 

  if (items.length === 0) {
    return { success: false, message: "Cart is empty." };
  }

  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items })
    });
    const data = await res.json();
    if (data.success) clearCart();
    return data;
  } catch (error) {
    console.error("Checkout error:", error);
    return { success: false, message: "Checkout failed." };
  }
};
