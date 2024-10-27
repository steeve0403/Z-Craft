import db from '../../db/dexieConfig';
import {Language} from '../../types/cv';
import {handleServiceError} from "../utils/utilsService.ts";

const languageService = {
    getLanguagesByCVId: (cvId: string): Promise<Language[]> =>
        handleServiceError(() => db.language.where('cvId').equals(cvId).toArray(), "Unable to fetch Language records."),

    addLanguage: (language: Language): Promise<void> =>
        handleServiceError(() => db.language.add(language), "Unable to add Language record."),

    updateLanguage: (id: string, changes: Partial<Language>): Promise<number> =>
        handleServiceError(() => db.language.update(id, changes), "Unable to update Language record."),

    deleteLanguage: (id: string): Promise<void> =>
        handleServiceError(() => db.language.delete(id), "Unable to delete Language record.")
};

export default languageService;


