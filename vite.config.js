import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: "jsdom",
        include: ["**/*.test.jsx", "**/*.test.js"], // Ensure that Vitest picks up your test files
    },
});
