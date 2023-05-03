import { defineConfig } from "vite";

export default defineConfig({
    build: {
        emptyOutDir: false,
        outDir: "./docs/dist",
        sourcemap: true,
        lib: {
            entry: {
                bezier: "./lib/bezier.js",
                drawing: "./lib/drawing.js",
                interaction: "./lib/interaction.js"
            },
            formats: ["es"]
        },
    },
})