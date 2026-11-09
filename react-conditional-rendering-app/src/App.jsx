import { useState } from "react";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Website</h1>
        <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
          {isLoggedIn ? "Log out" : "Log in"}
        </button>
      </header>

      {isLoggedIn && <h1>Welcome back!</h1>}
      {!isLoggedIn && <h1>Please log in.</h1>}
    </div>
  );
}

export default App;