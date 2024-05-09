import { defineConfig } from "vite";
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import autoprefixer from "autoprefixer";

export default defineConfig({
    root: resolve(__dirname, 'src'),
    build: {
        outDir: resolve(__dirname, 'dist'),
        rollupOptions: {
            input: {
              index: resolve(__dirname, 'src/index.html'),
              profile: resolve(__dirname, 'src/profile.html'),
              messages: resolve(__dirname, 'src/messages.html'),
              register: resolve(__dirname, 'src/register.html'),
              404: resolve(__dirname, 'src/404.html'),
              500: resolve(__dirname, 'src/500.html'),
            }
        },
},
    server: {
        port: 3000,
    },
    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, 'src/partials'),
            context: {
                title: "Messenger"
            },
        }),
    ],
})
