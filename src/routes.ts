import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
// const CVList = lazy(() => import('./pages/CVList'));
const CVEditor = lazy(() => import('./pages/CVEditor'));
// const CVPreview = lazy(() => import('./pages/CVPreview'));
// const NotFound = lazy(() => import('./pages/NotFound'));

export const routes = [
    { path: '/', component: Home },
    // { path: '/cvs', components: CVList },
    { path: '/cv/new', component: CVEditor },
    { path: '/cv/edit/:id', component: CVEditor },
    // { path: '/cv/preview/:id', components: CVPreview },
    // { path: '*', components: NotFound },
];
