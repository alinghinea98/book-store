import { createSignal, createResource, type Component, Show } from "solid-js";
import Header from "./Header";

const fetchBooks = async () => {
    const base = import.meta.env.SITE ?? "http://localhost:4321";
    const res = await fetch(`${base}/api/books`);
    return res.json();
};

const BooksStore: Component = () => {
    const [cart, setCart] = createSignal<number[]>([]);
    const [borrowed, setBorrowed] = createSignal<number[]>([]);
    const [books] = createResource(fetchBooks);

    const handleAddToCart = async (id: number) => {
        if (cart().includes(id)) return;
        setCart([...cart(), id]);
        await fetch("/api/cart", {
            method: "POST",
            body: JSON.stringify({ id }),
            headers: { "Content-Type": "application/json" }
        });
    };

    const handleBorrow = async (id: number) => {
        if (borrowed().includes(id)) return;
        setBorrowed([...borrowed(), id]);
        await fetch("/api/borrow", {
            method: "POST",
            body: JSON.stringify({ id }),
            headers: { "Content-Type": "application/json" }
        });
    };

    return (
        <>
            <Header />
            <div class="main-content">
                <div class="books-grid">
                    <Show when={books()} fallback={<p>Loading books...</p>}>
                        {books()!.map((book) => (
                            <div class="book-card">
                                <div class="book-image">
                                    <img
                                        src={book.image}
                                        alt={book.title}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = "/assets/book-placeholder.png";
                                        }}
                                    />
                                </div>
                                <div class="book-info">
                                    <h3>{book.title}</h3>
                                    <p class="author">{book.author}</p>

                                    <Show
                                        when={!cart().includes(book.id)}
                                        fallback={
                                            <button class="add-to-cart" disabled>
                                                In Cart
                                            </button>
                                        }
                                    >
                                        <button class="add-to-cart" onClick={() => handleAddToCart(book.id)}>
                                            Add to Cart
                                        </button>
                                    </Show>

                                    <Show
                                        when={!borrowed().includes(book.id)}
                                        fallback={
                                            <button
                                                class="add-to-cart"
                                                disabled
                                                style="margin-top: 0.5rem; background-color: #00b894;"
                                            >
                                                Borrowed
                                            </button>
                                        }
                                    >
                                        <button
                                            class="add-to-cart"
                                            style="margin-top: 0.5rem; background-color: #00b894;"
                                            onClick={() => handleBorrow(book.id)}
                                        >
                                            Borrow
                                        </button>
                                    </Show>
                                </div>
                            </div>
                        ))}
                    </Show>
                </div>
            </div>
        </>
    );
};

export default BooksStore;
