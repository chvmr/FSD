import { createRoot } from "react-dom/client";

const name = "Ravi";
const age = 25;
const message = (
  <span>Hello, my name is {name} and I am {age} years old.</span>
);
createRoot(document.getElementById("root")).render(
  <div>
    <h1>JSX Render App</h1>
    <p>{message}</p>
  </div>,
);