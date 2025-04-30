import { type Component } from "solid-js";
import "../styles/header.css";

const Header: Component = () => {

    const openCart = () => {
        alert("Cart opened");
    };
    return (
        <header class="header">
            <div class="header-left">
                <img src="/assets/book-store.png" alt="Logo" class="logo-small" />
            </div>
            <div class="header-center">
                <button class="icon-button" onClick={() => openCart()} title="Cart">
                    🛒
                </button>
            </div>
            <div class="header-right">
                <button class="icon-button" title="Logout" onClick={() => window.location.href = 'auth'}>
                    🔓
                </button>
            </div>
        </header>
    );
};

export default Header;
