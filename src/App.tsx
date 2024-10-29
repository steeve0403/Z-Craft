import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import { routes } from './routes';
import LoadingSpinner from './components/LoadingSpinner';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Sidebar from './components/main/Sidebar.tsx';
import { seedDatabase } from "./db/dbSeed";

const App: React.FC = () => {
    useEffect(() => {
        seedDatabase();
    }, []); // Note: empty dependency array to ensure it runs only on mount

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState);
    };

    return (
        <ErrorBoundary>
            <ThemeProvider>
                <Router>
                    <div className="layout">
                        <Header toggleSidebar={toggleSidebar} />
                        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

                        <main className={`layout__main ${isSidebarOpen ? 'main--shifted' : ''}`}>
                            <div className="container">
                                <Suspense fallback={<LoadingSpinner />}>
                                    <Routes>
                                        {routes.map((route) => (
                                            <Route key={route.path} path={route.path} element={<route.component />} />
                                        ))}
                                    </Routes>
                                </Suspense>
                            </div>
                        </main>
                        <Footer />
                    </div>
                </Router>
            </ThemeProvider>
        </ErrorBoundary>
    );
};

export default App;
