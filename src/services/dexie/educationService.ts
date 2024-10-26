import db from '../../db/dexieConfig';
import {Education} from '../../types/cv';

const educationService = {
    getEducationsByCVId: async (cvId: string): Promise<Education[]> => {
        return db.education.where('cvId').equals(cvId).toArray();
    },

    addEducation: async (education: Education): Promise<void> => {
        await db.education.add(education);
    },

    updateEducation: async (id: string, changes: Partial<Education>): Promise<void> => {
        await db.education.update(id, changes);
    },

    deleteEducation: async (id: string): Promise<void> => {
        await db.education.delete(id);
    },
};

export default educationService;

