import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from '@components/Layout/Layout';
import { AppProviders } from '@/contexts/Appproviders';
import DatabaseInitializer from '@components/DatabaseInitilizer/DatabaseInitilizer';
import AppRoutes from '@components/AppRoutes/AppRoutes';

const App: React.FC = () => {
    return (
        <AppProviders>
            <Router>
                <DatabaseInitializer>
                    <Layout>
                        <AppRoutes />
                    </Layout>
                </DatabaseInitializer>
            </Router>
        </AppProviders>
    );
};

export default App;
