import React, { Suspense } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ThemeProvider} from './contexts/ThemeContext.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import {routes} from './routes.ts';
import LoadingSpinner from "./components/LoadingSpinner.tsx";

const App: React.FC = () => {
    return (
        <ErrorBoundary>
            <ThemeProvider>
                <Router>
                    <div className="layout">
                        <Suspense fallback={<LoadingSpinner />}>
                            <Routes>
                                {routes.map((route) => (
                                    <Route key={route.path} path={route.path} element={<route.component />} />
                                ))}
                            </Routes>
                        </Suspense>
                    </div>
                </Router>
            </ThemeProvider>
        </ErrorBoundary>
    );
};

export default App
