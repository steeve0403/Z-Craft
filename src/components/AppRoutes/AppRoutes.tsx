// components/AppRoutes/AppRoutes.tsx

import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes } from '@/routes';
import LoadingOverlay from '../ui/LoadingOverlay/LoadingOverlay';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const AppRoutes: React.FC = () => {
    return (
        <Suspense
            fallback={
                <LoadingOverlay
                    isActive={true}
                    message='Chargement de la page...'
                />
            }
        >
            <ErrorBoundary>
                <Routes>
                    {routes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={<route.component />}
                        />
                    ))}
                </Routes>
            </ErrorBoundary>
        </Suspense>
    );
};

export default AppRoutes;
