import React, {Suspense, useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ThemeProvider} from './contexts/ThemeContext.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import {routes} from './routes.ts';
import LoadingSpinner from './components/LoadingSpinner.tsx';
import Header from './layouts/Header.tsx';
import Footer from './layouts/Footer.tsx';
import Sidebar from './components/Sidebar.tsx';
import {seedDatabase} from "./db/dbSeed.ts";

const App: React.FC = () => {

    useEffect(() => {
        seedDatabase();
    }, []);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <ErrorBoundary>
            <ThemeProvider>
                <Router>
                    <div className="layout">
                        <Header toggleSidebar={toggleSidebar}/>
                        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>

                        <main className={`layout__main ${isSidebarOpen ? 'main--shifted' : ''}`}>
                            <div className="container">
                                <Suspense fallback={<LoadingSpinner/>}>
                                    <Routes>
                                        {routes.map((route) => (
                                            <Route key={route.path} path={route.path} element={<route.component/>}/>
                                        ))}
                                    </Routes>
                                </Suspense>
                            </div>
                        </main>
                        <Footer/>
                    </div>
                </Router>
            </ThemeProvider>
        </ErrorBoundary>
    );
};

export default App;

