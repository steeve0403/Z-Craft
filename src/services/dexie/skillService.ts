import db from '../../db/dexieConfig.ts';
import {Skill} from '../../types/cv';

const skillService = {
    getSkillsByCVId: async (cvId: string): Promise<Skill[]> => {
        return db.skill.where('cvId').equals(cvId).toArray();
    },

    addSkill: async (skill: Skill): Promise<void> => {
        await db.skill.add(skill);
    },

    updateSkill: async (id: string, changes: Partial<Skill>): Promise<void> => {
        await db.skill.update(id, changes);
    },

    deleteSkill: async (id: string): Promise<void> => {
        await db.skill.delete(id);
    },
};

export default skillService;


