import { defineConfig } from "vite";

export default defineConfig({
    build: {
        emptyOutDir: false,
        outDir: "dist",
        sourcemap: true,
        lib: {
            entry: {
                calculation: "./lib/calculation.js",
                drawing: "./lib/drawing.js",
                interaction: "./lib/interaction.js"
            },
            formats: ["es", "cjs"]
        },
    },
})