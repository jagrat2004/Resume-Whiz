import { Toaster as Sonner } from "sonner";
import { useState, useEffect } from "react";

const Toaster = ({ themeProp, ...props }) => {
  // If themeProp is passed, use it, else fallback to system preference or "light"
  const [theme, setTheme] = useState(themeProp || "light");

  useEffect(() => {
    if (!themeProp) {
      // Detect system theme preference if no theme prop
      const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setTheme(darkQuery.matches ? "dark" : "light");
      
      // Optionally listen for changes
      const handler = e => setTheme(e.matches ? "dark" : "light");
      darkQuery.addEventListener("change", handler);
      return () => darkQuery.removeEventListener("change", handler);
    }
  }, [themeProp]);

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={{
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
      }}
      {...props}
    />
  );
};

export { Toaster };
