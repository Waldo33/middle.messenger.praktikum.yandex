import { defineConfig } from "vite";
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
    root: resolve(__dirname, 'src'),
    build: {
        outDir: resolve(__dirname, 'dist')
    },
    server: {
        port: 3000,
    },
    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, 'src/partials'),
        })
    ]
})