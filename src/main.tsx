import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import '@/styles/main.scss';

/**
 * Initializes axe-core for accessibility checks in development mode.
 * This function dynamically imports react-axe to perform automated
 * accessibility tests in the browser, which can be helpful for identifying
 * accessibility issues during development.
 *
 * Note: react-axe is only initialized if the environment is development.
 */
(async function initializeAxe() {
    if (import.meta.env.MODE === 'development') {
        try {
            const { default: reactAxe } = await import('@axe-core/react');
            const { default: React } = await import('react');

            // Use the imported React to initialize react-axe for accessibility checks
            await reactAxe(React, createRoot, 1000);
        } catch (error) {
            console.error(
                'Failed to initialize axe for accessibility checks:',
                error
            );
        }
    }
})();

/**
 * Main entry point for the application.
 * - This script sets up the root component for rendering the entire app.
 * - StrictMode is used for identifying potential issues during development.
 * - Ensures that the root element exists before attempting to render the app.
 *
 * If the root element is not found, an error is thrown to prevent a silent failure.
 */
const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error("Root element with ID 'root' not found.");
}

/**
 * Create a React root using React 18's new API and render the main application.
 *
 * The StrictMode wrapper helps identify unsafe lifecycles and other issues during development.
 */
createRoot(rootElement).render(
    <StrictMode>
        <App />
    </StrictMode>
);
