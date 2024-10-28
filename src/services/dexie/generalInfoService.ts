import db from '../../db/dexieConfig';
import { GeneralInfo } from '../../types/cv';
import { handleServiceError } from '../utils/utilsService';

const generalInfoService = {
    getGeneralInfoByCVId: async (cvId: string): Promise<GeneralInfo[]> =>
        handleServiceError(
            () => db.generalInfo.where('cvId').equals(cvId).toArray(),
            `Failed to fetch general info for CV with ID: ${cvId}`
        ),

    addGeneralInfo: async (generalInfo: GeneralInfo): Promise<void> =>
        handleServiceError(async () => {
            await db.generalInfo.add(generalInfo);
        }, "Failed to add general info to the database."),

    updateGeneralInfo: async (generalInfoId: string, changes: Partial<GeneralInfo>): Promise<number> =>
        handleServiceError(
            () => db.generalInfo.update(generalInfoId, changes),
            "Failed to update general info in the database."
        ),

    deleteGeneralInfo: async (generalInfoId: string): Promise<void> =>
        handleServiceError(
            () => db.generalInfo.delete(generalInfoId),
            "Failed to delete general info from the database."
        ),
};

export default generalInfoService;
