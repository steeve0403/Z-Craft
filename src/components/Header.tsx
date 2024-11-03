import React from 'react';
import { useSidebar } from '@/contexts/SidebarProvider';
import { useTheme } from '@/contexts/UseTheme';
// import './Header.scss';

interface HeaderProps {
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = () => {
    const { toggleSidebar } = useSidebar();
    const { theme, toggleTheme } = useTheme();

    return (
        <header className='header glass-effect'>
            <button
                className='header__menu-button'
                onClick={toggleSidebar}
                aria-label='Toggle Sidebar'
            >
                <i className='fas fa-bars'></i>
            </button>

            <h1 className='header__title'>Z-Craft CV Manager</h1>

            <div className='header__actions'>
                {/* Bouton de changement de thème */}
                <button
                    className='header__theme-button'
                    onClick={toggleTheme}
                    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                    {theme === 'light' ? (
                        <i className='fa fa-moon'></i>
                    ) : (
                        <i className='fa fa-sun'></i>
                    )}
                </button>

                {/* Bouton de connexion/deconnexion pour l'avenir */}
                <button
                    className='header__auth-button'
                    aria-label='Sign In'
                    onClick={() => alert('Login logic goes here')}
                >
                    <i className='fas fa-user-circle'></i>
                </button>
            </div>
        </header>
    );
};

export default Header;
