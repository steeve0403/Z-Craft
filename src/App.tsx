import React, {Suspense} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ThemeProvider} from './contexts/ThemeContext.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import {routes} from './routes.ts';
import LoadingSpinner from './components/LoadingSpinner.tsx';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';

const App: React.FC = () => {
    return (
        <ErrorBoundary>
            <ThemeProvider>
                <Router>
                    <div className="layout">
                        <Header/>
                        <main className="layout__main">
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

export default App
