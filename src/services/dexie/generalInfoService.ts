import db from '../../db/dexieConfig';
import { GeneralInfo } from '../../types/cv';
import {handleServiceError} from "../utils/utilsService.ts";

const generalInfoService = {
    getGeneralInfosByCVId: (cvId: string): Promise<GeneralInfo[]> =>
        handleServiceError(() => db.generalInfo.where('cvId').equals(cvId).toArray(), "Unable to fetch General Info."),

    addGeneralInfo: (generalInfo: GeneralInfo): Promise<void> =>
        handleServiceError(() => db.generalInfo.add(generalInfo), "Unable to add General Info."),

    updateGeneralInfo: (id: string, changes: Partial<GeneralInfo>): Promise<number> =>
        handleServiceError(() => db.generalInfo.update(id, changes), "Unable to update General Info."),

    deleteGeneralInfo: (id: string): Promise<void> =>
        handleServiceError(() => db.generalInfo.delete(id), "Unable to delete General Info.")
};

export default generalInfoService;
