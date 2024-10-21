import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {ThemeProvider} from "./contexts/ThemeContext.tsx";

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <Router>
                <div className="layout">

                </div>
            </Router>
        </ThemeProvider>
    );
};

export default App
