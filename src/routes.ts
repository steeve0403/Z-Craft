import {lazy} from 'react';

const Home = lazy(() => import('./pages/Home'));
const CVListPage = lazy(() => import('./pages/CVListPage'));
const CVDetail = lazy(() => import('./pages/CVDetailPage'));
const CVEdit = lazy(() => import('./pages/CVEditPage'));

export const routes = [
    {path: '/', component: Home},
    {path: '/cvs', component: CVListPage},
    {path: '/cv/:id', component: CVDetail},
    {path: '/cv/:id/edit', component: CVEdit},
];
