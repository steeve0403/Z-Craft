import { lazy } from 'react';

// Pages principales
const Home = lazy(() => import('./pages/Home'));
const CVList = lazy(() => import('./pages/CVList'));
const CVEditorMain = lazy(() => import('./pages/CVEditorMain'));

// Pages de section pour l'édition
const ExperienceDetail = lazy(() => import('./pages/sections/ExperienceDetail'));
// const EducationDetail = lazy(() => import('./pages/sections/EducationDetail'));
// const SkillDetail = lazy(() => import('./pages/sections/SkillDetail'));
// const LanguageDetail = lazy(() => import('./pages/sections/LanguageDetail'));

// Définition des routes
export const routes = [
    { path: '/', component: Home },
    { path: '/cvs', component: CVList },
    { path: '/cv/new', component: CVEditorMain },
    { path: '/cv/edit/:id', component: CVEditorMain },

    // Routes de section pour l'édition d'un CV
    { path: '/cv/edit/:id/experience', component: ExperienceDetail },
    // { path: '/cv/edit/:id/education', component: EducationDetail },
    // { path: '/cv/edit/:id/skills', component: SkillDetail },
    // { path: '/cv/edit/:id/languages', component: LanguageDetail },
];
