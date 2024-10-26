import db from "../../db/dexieConfig.ts";
import { Language } from '../../types/cv';

const languageService = {
    getLanguagesByCVId: async (cvId: string): Promise<Language[]> => {
        return  db.language.where('cvId').equals(cvId).toArray();
    },

    addLanguage: async (language: Language): Promise<void> => {
        await db.language.add(language);
    },

    updateLanguage: async (id: string, changes: Partial<Language>): Promise<void> => {
        await db.language.update(id, changes);
    },

    deleteLanguage: async (id: string): Promise<void> => {
        await db.language.delete(id);
    },
};

export default languageService;

