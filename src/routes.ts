import {lazy} from 'react';

const Home = lazy(() => import('./pages/Home'));

// const NotFound = lazy(() => import('./page/NotFound'));

export const routes = [
    {path: '/', component: Home},
    // { path: '*', component: NotFound },
];
