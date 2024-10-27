import {CV} from '../../types/cv';
import db from '../../db/dexieConfig';
import {handleServiceError} from "../utils/utilsService.ts";

const cvService = {
    getAllCVs: (): Promise<CV[]> =>
        handleServiceError(() => db.cvs.toArray(), "Unable to fetch CVs."),

    addCV: (cv: CV): Promise<void> =>
        handleServiceError(() => db.cvs.add(cv), "Unable to add CV."),

    updateCV: (cvId: string, changes: Partial<CV>): Promise<number> =>
        handleServiceError(() => db.cvs.update(cvId, changes), "Unable to update CV."),

    deleteCV: (cvId: string): Promise<void> =>
        handleServiceError(() => db.cvs.delete(cvId), "Unable to delete CV.")
};

export default cvService;




