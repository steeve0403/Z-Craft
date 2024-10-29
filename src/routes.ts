// src/routes.ts
import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const CVListPage = lazy(() => import('./pages/CVListPage'));
// const CVDetail = lazy(() => import('./pages/CVDetail'));

export const routes = [
    { path: '/', component: Home },
    { path: '/cvs', component: CVListPage },
    // { path: '/cv/:id', component: CVDetail },
];
