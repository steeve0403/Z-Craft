import db from '../../db/dexieConfig';
import { Language } from '../../types/cv';
import { handleServiceError } from '../utils/utilsService';

const languageService = {
    getLanguagesByCVId: async (cvId: string): Promise<Language[]> =>
        handleServiceError(
            () => db.language.where('cvId').equals(cvId).toArray(),
            `Failed to fetch languages for CV with ID: ${cvId}`
        ),

    addLanguage: async (language: Language): Promise<void> =>
        handleServiceError(async () => {
            await db.language.add(language);
        }, "Failed to add language to the database."),

    updateLanguage: async (languageId: string, changes: Partial<Language>): Promise<number> =>
        handleServiceError(
            () => db.language.update(languageId, changes),
            "Failed to update language in the database."
        ),

    deleteLanguage: async (languageId: string): Promise<void> =>
        handleServiceError(
            () => db.language.delete(languageId),
            "Failed to delete language from the database."
        ),
};

export default languageService;

