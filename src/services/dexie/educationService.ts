import db from '../../db/dexieConfig';
import { Education } from '../../types/cv';
import {handleServiceError} from "../utils/utilsService.ts";

const educationService = {
    getEducationsByCVId: (cvId: string): Promise<Education[]> =>
        handleServiceError(() => db.education.where('cvId').equals(cvId).toArray(), "Unable to fetch Education records."),

    addEducation: (education: Education): Promise<void> =>
        handleServiceError(() => db.education.add(education), "Unable to add Education record."),

    updateEducation: (id: string, changes: Partial<Education>): Promise<number> =>
        handleServiceError(() => db.education.update(id, changes), "Unable to update Education record."),

    deleteEducation: (id: string): Promise<void> =>
        handleServiceError(() => db.education.delete(id), "Unable to delete Education record.")
};

export default educationService;


