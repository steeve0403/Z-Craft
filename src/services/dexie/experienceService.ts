import db from '../../db/dexieConfig';
import {Experience} from '../../types/cv';
import {handleServiceError} from "../utils/utilsService.ts";

const experienceService = {
    getExperiencesByCVId: (cvId: string): Promise<Experience[]> =>
        handleServiceError(() => db.experience.where('cvId').equals(cvId).toArray(), "Unable to fetch Experience records."),

    addExperience: (experience: Experience): Promise<void> =>
        handleServiceError(() => db.experience.add(experience), "Unable to add Experience record."),

    updateExperience: (id: string, changes: Partial<Experience>): Promise<number> =>
        handleServiceError(() => db.experience.update(id, changes), "Unable to update Experience record."),

    deleteExperience: (id: string): Promise<void> =>
        handleServiceError(() => db.experience.delete(id), "Unable to delete Experience record.")
};

export default experienceService;


