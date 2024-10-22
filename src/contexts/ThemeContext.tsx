import React, {createContext, useEffect, useState} from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        if (savedTheme === 'light' || savedTheme === 'dark') {
            return savedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.classList.toggle('dark', theme === 'dark');

        return () => {
            document.documentElement.classList.remove('dark');
        };
    }, [theme]);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleSystemChangeTheme = (e: MediaQueryListEvent) => {
            if (!localStorage.getItem('theme')) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        };
        mediaQuery.addEventListener('change', handleSystemChangeTheme);
        return () => {
            mediaQuery.removeEventListener('change', handleSystemChangeTheme);
        };
    }, []);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

