import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/manrope";
import "./styles.css";
import App from "./App";

const storedTheme = window.localStorage.getItem("gl-theme");
document.documentElement.dataset.theme = storedTheme === "dark" || storedTheme === "light"
  ? storedTheme
  : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
