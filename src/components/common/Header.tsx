import React from 'react';
import {Button} from '../ui/Button';
import {Sun, Moon, Bell} from 'lucide-react';
import {useTheme} from '../../contexts/UseTheme';
import Logo from './Logo';
import Navigation from './Navigation';
import SearchBar from '../ui/SearchBar';
import ProfileMenu from '../ui/ProfileMenu';

interface HeaderProps {
    toggleSidebar: () => void;
}

/**
 * Header component representing the top navigation bar of the application.
 * Contains the logo, navigation links, theme toggle, notification, profile menu, and sidebar toggle button.
 * @param toggleSidebar - Function to toggle the sidebar visibility.
 */
const Header: React.FC<HeaderProps> = ({toggleSidebar}) => {
    const {theme, toggleTheme} = useTheme();

    const themeIcon = theme === 'dark' ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>;
    const themeLabel = `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`;

    return (
        <header className="header">
            <div className="header__container">
                <Logo/>
                <Navigation/>
                <SearchBar/>
                <div className="header__actions">
                    <Button
                        onClick={toggleTheme}
                        className="button button--outline button--sm"
                        aria-label={themeLabel}
                    >
                        {themeIcon}
                    </Button>
                    <Button
                        className="button button--outline button--sm header__notification"
                        aria-label="Notifications"
                    >
                        <Bell className="w-5 h-5"/>
                    </Button>
                    <ProfileMenu/>
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