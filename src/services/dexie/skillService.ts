import db from '../../db/dexieConfig';
import {Skill} from '../../types/cv';
import {handleServiceError} from "../utils/utilsService.ts";

const skillService = {
    getSkillsByCVId: (cvId: string): Promise<Skill[]> =>
        handleServiceError(() => db.skill.where('cvId').equals(cvId).toArray(), "Unable to fetch Skill records."),

    addSkill: (skill: Skill): Promise<void> =>
        handleServiceError(() => db.skill.add(skill), "Unable to add Skill record."),

    updateSkill: (id: string, changes: Partial<Skill>): Promise<number> =>
        handleServiceError(() => db.skill.update(id, changes), "Unable to update Skill record."),

    deleteSkill: (id: string): Promise<void> =>
        handleServiceError(() => db.skill.delete(id), "Unable to delete Skill record.")
};

export default skillService;



