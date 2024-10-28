import db from '../../db/dexieConfig';
import {Experience} from '../../types/cv';
import {handleServiceError} from "../utils/utilsService.ts";

const experienceService = {
    getExperiencesByCVId: async (cvId: string): Promise<Experience[]> =>
        handleServiceError(
            () => db.experience.where('cvId').equals(cvId).toArray(),
            `Failed to fetch experiences for CV with ID: ${cvId}`
        ),

    addExperience: async (experience: Experience): Promise<void> =>
        handleServiceError(async () => {
            await db.experience.add(experience);
        }, "Failed to add experience to the database."),

    updateExperience: async (experienceId: string, changes: Partial<Experience>): Promise<number> =>
        handleServiceError(
            () => db.experience.update(experienceId, changes),
            "Failed to update experience in the database."
        ),

    deleteExperience: async (experienceId: string): Promise<void> =>
        handleServiceError(
            () => db.experience.delete(experienceId),
            "Failed to delete experience from the database."
        ),
};

export default experienceService;
