import { createSignal, type Component, Show, createEffect } from "solid-js";

const AuthForm: Component = () => {
  const [activeTab, setActiveTab] = createSignal<'login' | 'register'>('login');
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [name, setName] = createSignal("");
  const [errorMessage, setErrorMessage] = createSignal("");

  createEffect(() => {
    const params = new URLSearchParams(globalThis.location.search);
    const tab = params.get('tab');
    if (tab === 'register') {
      setActiveTab('register');
    }
  });

  const handleLogin = async (e: Event) => {
    e.preventDefault();
    setErrorMessage("");
    const loginData = { email: email(), password: password() };

    if (!loginData.email || !loginData.password) {
      setErrorMessage("Please fill out all fields");
      return;
    }

    try {
      const response = await fetch('https://my-api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Login failed");
      }

      const result = await response.json();
      localStorage.setItem('user', JSON.stringify(result.user));
      globalThis.location.href = '/books';
    } catch (error) {
      setErrorMessage(error.message || "An error occurred");
    }
  };

  const handleRegister = async (e: Event) => {
    e.preventDefault();
    setErrorMessage("");

    const registerData = {
      name: name(),
      email: email(),
      password: password(),
    };

    if (!registerData.name || !registerData.email || !registerData.password) {
      setErrorMessage("Please fill out all fields");
      return;
    }

    try {
      const response = await fetch("https://my-api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Registration failed");
      }

      const result = await response.json();

      localStorage.setItem("user", JSON.stringify(result.user));
      globalThis.location.href = "/books";
    } catch (error) {
      setErrorMessage(error.message || "An unexpected error occurred during registration");
    }
  };

  return (
    <div class="auth-container">
      <div class="auth-card">
        <div class="tab-header">
          <button
            class={`tab-button ${activeTab() === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            class={`tab-button ${activeTab() === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Register
          </button>
        </div>

        <div class="form-container">
          <Show when={errorMessage()}>
            <div class="error-message">{errorMessage()}</div>
          </Show>

          <Show when={activeTab() === 'login'}>
            <form onSubmit={handleLogin}>
              <div class="form-group">
                <label for="login-email">Email</label>
                <input
                  id="login-email"
                  type="email"
                  value={email()}
                  onInput={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div class="form-group">
                <label for="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  value={password()}
                  onInput={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div class="form-footer">
                <button type="submit" class="submit-button">Login</button>
              </div>
            </form>
          </Show>

          <Show when={activeTab() === 'register'}>
            <form onSubmit={handleRegister}>
              <div class="form-group">
                <label for="register-name">Full Name</label>
                <input
                  id="register-name"
                  type="text"
                  value={name()}
                  onInput={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div class="form-group">
                <label for="register-email">Email</label>
                <input
                  id="register-email"
                  type="email"
                  value={email()}
                  onInput={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div class="form-group">
                <label for="register-password">Password</label>
                <input
                  id="register-password"
                  type="password"
                  value={password()}
                  onInput={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                />
              </div>

              <div class="form-footer">
                <button type="submit" class="submit-button">Register</button>
              </div>
            </form>
          </Show>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;