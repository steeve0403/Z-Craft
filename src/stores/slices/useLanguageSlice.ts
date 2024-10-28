// src/stores/slices/useLanguageSlice.ts
import { StateCreator } from 'zustand';
import { Language } from '../../types/cv';
import languageService from '../../services/dexie/languageService';

export interface LanguageSlice {
    languages: Language[];
    fetchLanguages: (cvId: string) => Promise<void>;
    addLanguage: (language: Language) => Promise<void>;
    updateLanguage: (languageId: string, changes: Partial<Language>) => Promise<void>;
    deleteLanguage: (languageId: string) => Promise<void>;
    loading: boolean;
    error: string | null;
}

export const createLanguageSlice: StateCreator<LanguageSlice> = (set) => ({
    languages: [],
    loading: false,
    error: null,

    fetchLanguages: async (cvId) => {
        set({ loading: true, error: null });
        try {
            const languages = await languageService.getLanguagesByCVId(cvId);
            set({ languages, loading: false });
        } catch (error) {
            set({ error: 'Error fetching languages', loading: false });
        }
    },

    addLanguage: async (language) => {
        set({ loading: true, error: null });
        try {
            await languageService.addLanguage(language);
            set((state) => ({ languages: [...state.languages, language], loading: false }));
        } catch (error) {
            set({ error: 'Error adding language', loading: false });
        }
    },

    updateLanguage: async (languageId, changes) => {
        set({ loading: true, error: null });
        try {
            await languageService.updateLanguage(languageId, changes);
            set((state) => ({
                languages: state.languages.map((lang) =>
                    lang.id === languageId ? { ...lang, ...changes } : lang
                ),
                loading: false,
            }));
        } catch (error) {
            set({ error: 'Error updating language', loading: false });
        }
    },

    deleteLanguage: async (languageId) => {
        set({ loading: true, error: null });
        try {
            await languageService.deleteLanguage(languageId);
            set((state) => ({
                languages: state.languages.filter((lang) => lang.id !== languageId),
                loading: false,
            }));
        } catch (error) {
            set({ error: 'Error deleting language', loading: false });
        }
    },
});
