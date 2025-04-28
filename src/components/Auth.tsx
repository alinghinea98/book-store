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
  
  const handleLogin = (e: Event) => {
    e.preventDefault();
    console.log('Login attempt with:', { email: email(), password: password() });

    if (email() && password()) {
      localStorage.setItem('user', JSON.stringify({ email: email() }));
      globalThis.location.href = '/dashboard';
    } else {
      setErrorMessage("Please enter both email and password");
    }
  };
  
  const handleRegister = (e: Event) => {
    e.preventDefault();
    console.log('Register attempt with:', { name: name(), email: email(), password: password() });
    
    if (name() && email() && password()) {
      localStorage.setItem('user', JSON.stringify({ name: name(), email: email() }));
      globalThis.location.href = '/dashboard';
    } else {
      setErrorMessage("Please fill out all fields");
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