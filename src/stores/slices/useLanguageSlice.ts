import {CV, Language} from '../../types/cv';
import { StateCreator } from 'zustand';

export interface LanguageStore {
    cvs: CV[];
    addLanguage: (cvId: string, language: Language) => void;
    updateLanguage: (cvId: string, language: Language) => void;
    removeLanguage: (cvId: string, languageName: string) => void;
}

export const createLanguageSlice: StateCreator<LanguageStore> = (set, get) => ({
    cvs: [],
    addLanguage: (cvId, language) => {
        const cvs = get().cvs;
        set({
            cvs: cvs.map((cv) =>
                cv.id === cvId ? { ...cv, languages: [...cv.languages, language] } : cv
            ),
        });
    },

    updateLanguage: (cvId, language) => {
        const cvs = get().cvs;
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

    removeLanguage: (cvId, languageName) => {
        const cvs = get().cvs;
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
