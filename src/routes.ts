// src/routes.ts
import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const CVList = lazy(() => import('./pages/CVList'));
const CVPreview = lazy(() => import('./pages/CVPreview'));
const CVEditorMain = lazy(() => import('./pages/CVEditorMain'));

// Section-specific pages
const ExperienceList = lazy(() => import('./pages/sections/ExperienceList'));
// const ExperienceDetail = lazy(() => import('./pages/sections/ExperienceDetail'));
// Add other section imports as needed

export const routes = [
    { path: '/', component: Home },
    { path: '/cvs', component: CVList },
    { path: '/cv/preview/:id', component: CVPreview },
    { path: '/cv/new', component: CVEditorMain },
    { path: '/cv/edit/:id', component: CVEditorMain },

    // Section-specific routes
    { path: '/cv/preview/:id/experience', component: ExperienceList },
    // { path: '/cv/preview/:id/experience/:expId', component: ExperienceDetail },
    // Define similar routes for other sections
];

