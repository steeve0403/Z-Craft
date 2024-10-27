import {StateCreator} from 'zustand';
import {Language} from '../../types/cv';
import languageService from "../../services/dexie/languageService";

export interface LanguageSlice {
    languages: Language[];
    loading: boolean;
    error: string | null;
    fetchLanguagesByCVId: (cvId: string) => Promise<void>;
    addLanguage: (language: Language) => Promise<void>;
    updateLanguage: (languageId: string, changes: Partial<Language>) => Promise<void>;
    deleteLanguage: (languageId: string) => Promise<void>;
}

export const createLanguageSlice: StateCreator<LanguageSlice> = (set) => ({
    languages: [],
    loading: false,
    error: null,

    fetchLanguagesByCVId: async (cvId) => {
        set({loading: true, error: null});
        try {
            const languages = await languageService.getLanguagesByCVId(cvId);
            set({languages});
        } catch (error) {
            set({error: 'Error while loading languages'});
        } finally {
            set({loading: false});
        }
    },

    addLanguage: async (language) => {
        set({loading: true, error: null});
        try {
            await languageService.addLanguage(language);
            set((state) => ({
                languages: [...state.languages, language],
            }));
        } catch (error) {
            set({error: 'Error while adding the language'});
        } finally {
            set({loading: false});
        }
    },

    updateLanguage: async (languageId, changes) => {
        set({loading: true, error: null});
        try {
            await languageService.updateLanguage(languageId, changes);
            set((state) => ({
                languages: state.languages.map((exp) =>
                    exp.id === languageId ? {...exp, ...changes} : exp
                ),
            }));
        } catch (error) {
            set({error: 'Error while updating the language'});
        } finally {
            set({loading: false});
        }
    },

    deleteLanguage: async (languageId) => {
        set({loading: true, error: null});
        try {
            await languageService.deleteLanguage(languageId);
            set((state) => ({
                languages: state.languages.filter((exp) => exp.id !== languageId),
            }));
        } catch (error) {
            set({error: 'Error while deleting the language'});
        } finally {
            set({loading: false});
        }
    },
});
