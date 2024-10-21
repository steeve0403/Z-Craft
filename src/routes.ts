import {lazy} from 'react';

const Home = lazy(() => import('./pages/Home'));

// const NotFound = lazy(() => import('./pages/NotFound'));

export const routes = [
    {path: '/', component: Home},
    // { path: '*', component: NotFound },
];
