import db from '../../db/dexieConfig';
import {Skill} from '../../types/cv';
import {handleServiceError} from '../utils/utilsService';

const skillService = {
    getSkillsByCVId: async (cvId: string): Promise<Skill[]> =>
        handleServiceError(
            () => db.skill.where('cvId').equals(cvId).toArray(),
            `Failed to fetch skills for CV with ID: ${cvId}`
        ),

    addSkill: async (skill: Skill): Promise<void> =>
        handleServiceError(async () => {
            await db.skill.add(skill);
        }, "Failed to add skill to the database."),

    updateSkill: async (skillId: string, changes: Partial<Skill>): Promise<number> =>
        handleServiceError(
            () => db.skill.update(skillId, changes),
            "Failed to update skill in the database."
        ),

    deleteSkill: async (skillId: string): Promise<void> =>
        handleServiceError(
            () => db.skill.delete(skillId),
            "Failed to delete skill from the database."
        ),
};

export default skillService;

