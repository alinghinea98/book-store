import { type Component } from "solid-js";
import "../styles/header.css";
import { cartItems } from "../stores/cart";

type HeaderProps = {
  onCartOpen: () => void;
};

const Header: Component<HeaderProps> = (props) => {
  return (
    <header class="header">
      <div class="header-left">
        <img src="/assets/book-store.png" alt="Logo" class="logo-small" />
      </div>
      <div class="header-center">
        <button
          class="icon-button"
          onClick={() => props.onCartOpen()}
          title="Cart">
          🛒 {cartItems().length > 0 ? `(${cartItems().length})` : ''}
        </button>
      </div>
      <div class="header-right">
        <button
          class="icon-button"
          title="Logout"
          onClick={() => window.location.href = 'auth'}
        >
          🔓
        </button>
      </div>
    </header>
  );
};

export default Header;