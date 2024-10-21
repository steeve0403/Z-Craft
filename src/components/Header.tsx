import React, {memo} from 'react';
import {Link} from 'react-router-dom';
import {useTheme} from '../contexts/ThemeContext';
import {Button} from './ui/Button';
import {Sun, Moon, FileText} from 'lucide-react';
// import styles from './Header.module.scss';

// Subcomponent for Logo
const Logo = memo(() => (
    <Link to="/" className="header__logo">
        <FileText className="header__logoIcon"/>
        <span>CV Manager</span>
    </Link>
));

// Subcomponent for Navigation
const Navigation = () => (
    <nav className="header__nav">
        <Link to="/cvs" className="header__navItem">
            My CVs
        </Link>
        <Link to="/cv/new" className="header__navItem">
            Create CV
        </Link>
    </nav>
);

const Header: React.FC = () => {
    const {theme, toggleTheme} = useTheme();

    const themeIcon = theme === 'dark' ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>;
    const themeLabel = `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`;

    return (
        <header className="header">
            <div className="header__container">
                <Logo/>
                <Navigation/>
                <Button
                    onClick={toggleTheme}
                    className="button button--outline button--sm"
                    aria-label={themeLabel}
                >
                    {themeIcon}
                </Button>
            </div>
        </header>
    );
};

export default Header;
