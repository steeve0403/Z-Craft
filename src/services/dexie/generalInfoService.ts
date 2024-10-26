import db from '../../db/dexieConfig.ts';
import { GeneralInfo } from '../../types/cv';

const experienceService = {
    getGeneralInfosByCVId: async (cvId: string): Promise<GeneralInfo[]> => {
        return db.generalInfo.where('cvId').equals(cvId).toArray();
    },

    addGeneralInfo: async (generalInfo: GeneralInfo): Promise<void> => {
        await db.generalInfo.add(generalInfo);
    },

    updateGeneralInfo: async (id: string, changes: Partial<GeneralInfo>): Promise<void> => {
        await db.generalInfo.update(id, changes);
    },

    deleteGeneralInfo: async (id: string): Promise<void> => {
        await db.generalInfo.delete(id);
    },
};

export default experienceService;

