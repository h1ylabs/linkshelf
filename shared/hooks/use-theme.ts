import { useContext } from "react";

import { ThemeProviderContext } from "@/shared/stores/theme";


export default function useTheme() {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};