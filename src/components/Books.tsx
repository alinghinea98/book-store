import { createSignal, type Component } from "solid-js";

const BooksStore: Component = () => {
  const [cart, setCart] = createSignal<number[]>([]);
  const [borrowed, setBorrowed] = createSignal<number[]>([]);

  const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", image: "/assets/book1.jpg" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", image: "/assets/book2.jpg" },
    { id: 3, title: "1984", author: "George Orwell", image: "/assets/book3.jpg" },
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen", image: "/assets/book4.jpg" },
    { id: 5, title: "The 48 Laws of Power", author: "Robert Greene", image: "/assets/book5.jpg" }
  ];

  const handleAddToCart = (id: number) => {
    if (!cart().includes(id)) {
      setCart([...cart(), id]);
    }
  };

  const handleBorrow = (id: number) => {
    if (!borrowed().includes(id)) {
      setBorrowed([...borrowed(), id]);
    }
  };

  return (
    <div class="main-content">
      <div class="books-grid">
        {books.map((book) => (
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
              <button
                class="add-to-cart"
                onClick={() => handleAddToCart(book.id)}
                disabled={cart().includes(book.id)}
              >
                {cart().includes(book.id) ? "In Cart" : "Add to Cart"}
              </button>
              <button
                class="add-to-cart"
                style="margin-top: 0.5rem; background-color: #00b894;"
                onClick={() => handleBorrow(book.id)}
                disabled={borrowed().includes(book.id)}
              >
                {borrowed().includes(book.id) ? "Borrowed" : "Borrow"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksStore;
