import db from '../../db/dexieConfig';
import {CV} from '../../types/cv';
import {handleServiceError} from '../utils/utilsService';

const cvService = {
    getAllCVs: async (): Promise<CV[]> =>
        handleServiceError(
            () => db.cvs.toArray(),
            "Failed to fetch CVs from the database."
        ),

    getCVById: async (id: string): Promise<CV | undefined> =>
        handleServiceError(
            () => db.cvs.get(id),
            `Failed to fetch CV with ID: ${id}`
        ),

    addCV: async (cv: CV): Promise<void> =>
        handleServiceError(async () => {
            const existingCV = await db.cvs.get(cv.id);
            if (existingCV) {
                throw new Error("A CV with this ID already exists.");
            }
            await db.cvs.add(cv);
        }, "Failed to add the CV to the database."),

    upsertCV: async (cv: CV): Promise<void> =>
        handleServiceError(async () => {
            const existingCV = await db.cvs.get(cv.id);
            if (existingCV) {
                await db.cvs.update(cv.id, cv);
            } else {
                await db.cvs.put(cv);
            }
        }, "Failed to upsert the CV in the database."),

    deleteCV: async (cvId: string): Promise<void> =>
        handleServiceError(
            () => db.cvs.delete(cvId),
            "Failed to delete the CV from the database."
        ),
};

export default cvService;






