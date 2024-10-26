import db from '../../db/dexieConfig.ts';
import {Experience} from '../../types/cv';

const experienceService = {
    getExperiencesByCVId: async (cvId: string): Promise<Experience[]> => {
        return db.experience.where('cvId').equals(cvId).toArray();
    },

    addExperience: async (experience: Experience): Promise<void> => {
        await db.experience.add(experience);
    },

    updateExperience: async (id: string, changes: Partial<Experience>): Promise<void> => {
        await db.experience.update(id, changes);
    },

    deleteExperience: async (id: string): Promise<void> => {
        await db.experience.delete(id);
    },
};

export default experienceService;

