import React from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import { useSidebar } from '@/contexts/SidebarProvider';
import useDatabaseSeed from '@/hooks/useDatabaseSeed';
import LoadingOverlay from '@components/ui/LoadingOverlay/LoadingOverlay'; // Nouveau composant

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isSidebarOpen, toggleSidebar } = useSidebar();
    const { isSeeding, seedError } = useDatabaseSeed();

    return (
        <div className='layout'>
            {/* Header principal sans balise <header> supplémentaire */}
            <Header toggleSidebar={toggleSidebar} />

            {/* Sidebar navigation */}
            <nav className='layout__sidebar'>
                <Sidebar
                    isOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                    aria-hidden={!isSidebarOpen}
                />
            </nav>

            {/* Main content area */}
            <main
                className={`layout__main ${isSidebarOpen ? 'main--shifted' : ''}`}
                aria-busy={isSeeding ? 'true' : 'false'}
            >
                <div className='container'>
                    {isSeeding && (
                        <LoadingOverlay
                            isActive={true}
                            message='Seeding database...'
                        />
                    )}

                    {/*{seedError && (*/}
                    {/*    <StatusMessage*/}
                    {/*        type='error'*/}
                    {/*        message={`Error while seeding database: ${seedError}`}*/}
                    {/*    />*/}
                    {/*)}*/}

                    {!isSeeding && !seedError && children}
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Layout;
