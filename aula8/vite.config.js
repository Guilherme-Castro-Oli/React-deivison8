import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// O plugin permite que o Vite entenda JSX e recursos do React.
export default defineConfig({ plugins: [react()] });
