import type { Component } from "solid-js";

const WelcomePage: Component = () => {
  const handleLogin = (): void => {
    window.location.href = '/auth';
  };

  const handleRegister = (): void => {
    window.location.href = '/auth?tab=register';
  };

  return (
    <div class="welcome-container">
      <div class="content-box">
        <div class="logo-wrapper">
          <img
            src="/assets/book-store.png"
            alt="App Logo"
            class="logo"
          />
        </div>

        <h1 class="welcome-title">Welcome to our Book Store</h1>

        <p class="welcome-message">
          Sign in to your account or create a new one to get started
        </p>

        <div class="action-buttons">
          <button
            class="button login-button"
            onClick={handleLogin}
          >
            <span class="button-text">Login</span>
          </button>

          <button
            class="button register-button"
            onClick={handleRegister}
          >
            <span class="button-text">Register</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;