import "@client/app/styles/globals.css";

import { ThemeProvider } from "@client/app/providers/theme-provider";
import App from "@client/pages/action";
import * as logger from "@service/logger";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const queryClient = new QueryClient();
const root = document.getElementById("root");

if (root) {
  createRoot(root).render(
    <StrictMode>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ThemeProvider>
    </StrictMode>,
  );
} else {
  logger.error("root element of action popup not found!");
}
