import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "flowbite";
import "tom-select/dist/css/tom-select.css";
import "react-date-range/dist/styles.css"; // main style
import "react-date-range/dist/theme/default.css"; // theme default

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
