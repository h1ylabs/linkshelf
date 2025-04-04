import "@frontend/app/styles/globals.css";

import { Logger } from "@core/utils/logger";
import { QueryProvider } from "@frontend/app/providers/query-provider";
import { ThemeProvider } from "@frontend/app/providers/theme-provider";
import App from "@frontend/pages/action";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const root = document.getElementById("root");
const logger = new Logger("page", "action");

if (root) {
  createRoot(root).render(
    <StrictMode>
      <ThemeProvider>
        <QueryProvider>
          <App />
        </QueryProvider>
      </ThemeProvider>
    </StrictMode>,
  );
} else {
  logger.error("root element of action popup not found!");
}
