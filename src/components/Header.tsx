import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/Button';
import { Sun, Moon, FileText } from 'lucide-react';

const Header: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="header">
            <div className="container header__container">
                <Link to="/" className="header__logo">
                    <FileText className="header__logo-icon" />
                    <span>CV Manager</span>
                </Link>
                <nav className="header__nav">
                    <Link to="/cvs" className="header__nav-item">
                        My CVs
                    </Link>
                    <Link to="/cv/new" className="header__nav-item">
                        Create CV
                    </Link>
                    <Button onClick={toggleTheme}
                            className="button button--outline button--sm"
                            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </Button>
                </nav>
            </div>
        </header>
    );
};

export default Header;