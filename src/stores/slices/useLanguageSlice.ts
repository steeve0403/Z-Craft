import {CV, Language} from '../../types/cv';
import { StateCreator } from 'zustand';

export interface LanguageStore {
    cvs: CV[];
    addLanguage: (cvId: string, language: Language) => void;
    updateLanguage: (cvId: string, language: Language) => void;
    removeLanguage: (cvId: string, languageName: string) => void;
}

export const createLanguageSlice: StateCreator<LanguageStore> = (set, get, store) => ({
    cvs: [],
    // Ajouter une langue dans un CV spécifique
    addLanguage: (cvId, language) => {
        const cvs = get().cvs; // Récupérer l'état global des CVs
        set({
            cvs: cvs.map((cv) =>
                cv.id === cvId ? { ...cv, languages: [...cv.languages, language] } : cv
            ),
        });
    },

    // Mettre à jour une langue existante dans un CV
    updateLanguage: (cvId, language) => {
        const cvs = get().cvs; // Récupérer l'état global des CVs
        set({
            cvs: cvs.map((cv) =>
                cv.id === cvId
                    ? {
                        ...cv,
                        languages: cv.languages.map((lang) =>
                            lang.name === language.name ? language : lang
                        ),
                    }
                    : cv
            ),
        });
    },

    // Supprimer une langue d'un CV
    removeLanguage: (cvId, languageName) => {
        const cvs = get().cvs; // Récupérer l'état global des CVs
        set({
            cvs: cvs.map((cv) =>
                cv.id === cvId
                    ? {
                        ...cv,
                        languages: cv.languages.filter((lang) => lang.name !== languageName),
                    }
                    : cv
            ),
        });
    },
});
