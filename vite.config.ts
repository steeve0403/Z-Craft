import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
// import viteCompression from 'vite-plugin-compression';
import svgrPlugin from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';
import Inspect from 'vite-plugin-inspect';
import { ErrorOverlay } from 'vite-plugin-error-overlay';
import viteImagemin from 'vite-plugin-imagemin';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(), // React plugin to support JSX and fast refresh
        svgrPlugin(), // Plugin to import SVG files as React components
        // viteCompression({ algorithm: ['gzip', 'brotliCompress'] }), // Plugin to compress assets using Gzip and Brotli
        Inspect(),
        ErrorOverlay(),
        viteImagemin({
            gifsicle: { optimizationLevel: 7 },
            optipng: { optimizationLevel: 7 },
            mozjpeg: { quality: 20 },
        }),
        VitePWA({
            registerType: 'autoUpdate',
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
            include: ['./src/**/*.ts', './src/**/*.tsx'],
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'), // Alias '@' to simplify imports from the 'src' directory
            '@components': path.resolve(__dirname, './src/components'), // Additional alias for components for easier access
        },
    },
    esbuild: {
        jsxInject: `import React from 'react'`, // Automatically inject React into JSX files (helpful if React import is missing)
    },
    css: {
        modules: {
            scopeBehaviour: 'local', // Enable CSS modules for local scoping of styles
            // generateScopedName: '[name]__[local]--[hash:base64:5]', // Custom naming pattern for CSS modules
        },
        preprocessorOptions: {
            scss: {
                additionalData: `
          @use "@/styles/abstracts/index" as *;
        `, // Globally load common SCSS variables, mixins, and functions into every SCSS file
            },
        },
    },
    build: {
        outDir: 'dist', // Directory where the build files are generated
        sourcemap: true, // Generates sourcemaps for debugging production code
        minify: 'terser', // Minify the output using Terser for advanced minification options
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                    if (id.includes('src/components')) {
                        return 'components';
                    }
                },
            },
        },
        target: 'esnext', // Set the target for build output, supporting latest JavaScript features
    },
    server: {
        fs: {
            strict: true,
        },
        port: 3000, // Define the port on which the development server will run
        open: true, // Automatically open the application in the default browser
        proxy: {
            '/api': {
                target: 'http://localhost:5000', // Proxy API requests to the backend server
                changeOrigin: true,
                secure: false,
            },
        },
    },
    // Environment Variables Configuration
    define: {
        'import.meta.env': {}, // Define environment variables for development and production builds
    },
});
