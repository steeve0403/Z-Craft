import db from '../../db/dexieConfig';
import {Education} from '../../types/cv';
import {handleServiceError} from '../utils/utilsService';

const educationService = {
    getEducationsByCVId: async (cvId: string): Promise<Education[]> =>
        handleServiceError(
            () => db.education.where('cvId').equals(cvId).toArray(),
            `Failed to fetch educations for CV with ID: ${cvId}`
        ),

    addEducation: async (education: Education): Promise<void> =>
        handleServiceError(async () => {
            await db.education.add(education);
        }, "Failed to add education to the database."),

    updateEducation: async (educationId: string, changes: Partial<Education>): Promise<number> =>
        handleServiceError(
            () => db.education.update(educationId, changes),
            "Failed to update education in the database."
        ),

    deleteEducation: async (educationId: string): Promise<void> =>
        handleServiceError(
            () => db.education.delete(educationId),
            "Failed to delete education from the database."
        ),
};

export default educationService;


