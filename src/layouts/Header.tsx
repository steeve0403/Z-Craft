import React, {memo} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {useTheme} from '../contexts/ThemeContext.tsx';
import {Button} from '../components/ui/Button.tsx';
import {Sun, Moon, FileText} from 'lucide-react';

interface HeaderProps {
    toggleSidebar: () => void;
}

const Logo = memo(() => (
    <Link to="/" className="header__logo">
        <FileText className="header__logoIcon"/>
        <span>CV Manager</span>
    </Link>
));

const Navigation = () => (
    <nav className="header__nav">
        <NavLink to="/cvs" className={({isActive}) => (isActive ? "header__nav-item active" : "header__nav-item")}>
            My CVs
        </NavLink>
        <NavLink to="/cv/new" className={({isActive}) => (isActive ? "header__nav-item active" : "header__nav-item")}>
            Create CV
        </NavLink>
    </nav>
);

const Header: React.FC<HeaderProps> = ({toggleSidebar}) => {
    const {theme, toggleTheme} = useTheme();

    const themeIcon = theme === 'dark' ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>;
    const themeLabel = `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`;

    return (
        <header className="header">
            <div className="header__container">
                <Logo/>
                <Navigation/>
                <div className="header__actions">
                    <Button
                        onClick={toggleTheme}
                        className="button button--outline button--sm"
                        aria-label={themeLabel}
                    >
                        {themeIcon}
                    </Button>
                    {/* Bouton pour ouvrir/fermer la sidebar */}
                    <Button
                        onClick={toggleSidebar}
                        className="button button--outline button--sm sidebar-toggle"
                        aria-label="Toggle sidebar"
                    >
                        ☰
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;

