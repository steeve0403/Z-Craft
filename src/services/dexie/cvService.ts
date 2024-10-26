import { CV } from '../../types/cv';
import db from "../../db/dexieConfig.ts";

const cvService = {
    getAllCVs: async (): Promise<CV[]> => {
        return db.cvs.toArray();
    },

    addCV: async (cv: CV): Promise<void> => {
        await db.cvs.add(cv);
    },

    updateCV: async (cvId: string, changes: Partial<CV>): Promise<void> => {
        await db.cvs.update(cvId, changes);
    },

    deleteCV: async (cvId: string): Promise<void> => {
        await db.cvs.delete(cvId);
    }
};

export default cvService;


