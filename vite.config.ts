import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import svgrPlugin from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';
// import viteImagemin from 'vite-plugin-imagemin';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
    plugins: [
        react(), // Support for React with JSX transformation and HMR
        svgrPlugin(), // Allow SVGs to be used as React components
        // viteImagemin({
        //     // Optimize image assets for faster load times
        //     gifsicle: { optimizationLevel: 7 },
        //     optipng: { optimizationLevel: 7 },
        //     mozjpeg: { quality: 50 },
        //     pngquant: {
        //         quality: [0.8, 0.9],
        //         speed: 4,
        //     },
        //     svgo: {
        //         plugins: [
        //             {
        //                 name: 'removeViewBox',
        //             },
        //             {
        //                 name: 'removeDimensions',
        //             },
        //         ],
        //     },
        // }),
        VitePWA({
            registerType: 'autoUpdate', // Automatically update the service worker
            manifest: {
                name: 'CV Manager Z-Craft',
                short_name: 'Z-Craft',
                theme_color: '#4f46e5',
                icons: [
                    {
                        src: 'icon-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: 'icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            },
        }),
        eslintPlugin({
            include: ['./src/**/*.ts', './src/**/*.tsx'], // Lint TypeScript files during the build
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'), // Alias for importing from 'src' directory
            '@components': path.resolve(__dirname, './src/components'),
            '@styles': path.resolve(__dirname, './src/styles'),
        },
    },
    build: {
        outDir: 'dist',
        sourcemap: true, // Generate source maps for easier debugging
        minify: 'esbuild', // Use esbuild for faster builds
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes('node_modules')) {
                        return 'vendor'; // Extract vendor libraries for caching purposes
                    }
                    if (id.includes('src/components')) {
                        return 'components'; // Separate components for better caching and performance
                    }
                },
            },
        },
    },
    server: {
        port: 3000, // Define the port for local development
        open: true, // Automatically open the browser when the server starts
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                secure: false, // Proxy API requests to avoid CORS issues during development
            },
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
                // additionalData: `@use '@/styles/abstracts/index' as *;`, // Import global SCSS variables
            },
        },
    },
});
