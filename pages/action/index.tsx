import "@/shared/lib/globals.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./app";

const root = document.getElementById("root");

if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  throw new Error("[Linkshelf] [ERROR] Action Root element not found!");
}
