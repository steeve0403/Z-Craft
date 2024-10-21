import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {ThemeProvider} from "./contexts/ThemeContext.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";

const App: React.FC = () => {
    return (
        <ErrorBoundary>
            <ThemeProvider>
                <Router>
                    <div className="layout">

                    </div>
                </Router>
            </ThemeProvider>
        </ErrorBoundary>
    );
};

export default App
