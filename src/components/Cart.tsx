import {
  createResource,
  createEffect,
  Show,
  For,
  type Component,
  createSignal,
  Accessor,
} from "solid-js";
import { cartItems, clearCart, removeFromCart } from "../stores/cart";
import { Book } from "../services/BooksService";

interface CartModalProps {
  isOpen: Accessor<boolean>;
  onClose: () => void;
}

const fetchBooksDetails = async (cartItemIds: number[]) => {
  if (!cartItemIds.length) return [];
  const base = import.meta.env.SITE ?? "http://localhost:4321";
  const res = await fetch(`${base}/api/books?ids=${cartItemIds.join(",")}`);
  return res.json();
};


const CartModal: Component<CartModalProps> = (props) => {
  const [total, setTotal] = createSignal(0);
  const [cartBooks] = createResource(() => cartItems(), (items) => {
    const itemIds = items.map((item) => item.id);
    return fetchBooksDetails(itemIds);
  });

  createEffect(() => {
    if (!filteredCartBooks().length) return;
    const sum = filteredCartBooks().reduce(
      (acc: number, book: Book) => acc + (book.price || 0),
      0
    );
    setTotal(sum);
  });

  const handleRemoveFromCart = async (id: number) => {
    await removeFromCart(id);
  };

  const handleCheckout = async () => {
    const items = cartItems();
    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items })
    });

    const data = await res.json();

    if (data.success) {
      clearCart();
      alert("Checkout successful!");
    } else {
      alert("Checkout failed: " + data.message);
    }
    props.onClose();
  };


  const filteredCartBooks = () =>
    (cartBooks() || []).filter((book) => cartItems().includes(book.id));

  return (
    <Show when={props.isOpen()}>
      <div class="modal-overlay" onClick={props.onClose}>
        <div class="modal-content" onClick={(e) => e.stopPropagation()}>
          <div class="modal-header">
            <h2>🛒 Your Cart</h2>
            <button class="close-button" onClick={props.onClose}>
              ×
            </button>
          </div>

          <div class="modal-body">
            <Show when={!cartBooks.loading} fallback={<p>Loading books...</p>}>
              <Show when={filteredCartBooks()?.length} fallback={<p>Your cart is empty.</p>}>
                <div class="cart-items">
                  <For each={filteredCartBooks()}>
                    {(book: Book) => (
                      <div class="cart-item">
                        <div class="cart-item-image">
                          <img
                            src={book.image}
                            alt={book.title}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "/assets/book-placeholder.png";
                            }}
                          />
                        </div>
                        <div class="cart-item-details">
                          <h3>{book.title}</h3>
                          <p class="author">{book.author}</p>
                          <p class="price">${book.price?.toFixed(2)}</p>
                        </div>
                        <button
                          class="remove-button"
                          onClick={() => handleRemoveFromCart(book.id)}>
                          Remove
                        </button>
                      </div>
                    )}
                  </For>
                </div>

                <div class="cart-summary">
                  <div class="cart-total">
                    <span>Total:</span>
                    <span>${total().toFixed(2)}</span>
                  </div>
                  <button
                    class="checkout-button"
                    onClick={handleCheckout}
                    disabled={filteredCartBooks()?.length === 0}
                  >
                    Checkout
                  </button>
                </div>
              </Show>
            </Show>
          </div>
        </div>
      </div>
    </Show>
  );
};

export default CartModal;
