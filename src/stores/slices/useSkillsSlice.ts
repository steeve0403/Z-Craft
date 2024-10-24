import {CV, Skill} from '../../types/cv';
import { StateCreator } from 'zustand';

export interface SkillStore {
    cvs: CV[]; // Tableau de CVs
    addSkill: (cvId: string, skill: Skill) => void;
    updateSkill: (cvId: string, skill: Skill) => void;
    removeSkill: (cvId: string, skillName: string) => void;
}

export const createSkillSlice: StateCreator<SkillStore> = (set, get) => ({
    cvs: [],
    addSkill: (cvId, skill) => {
        const cvs = get().cvs;
        set({
            cvs: cvs.map((cv) =>
                cv.id === cvId ? { ...cv, skills: [...cv.skills, skill] } : cv
            ),
        });
    },

    updateSkill: (cvId, skill) => {
        const cvs = get().cvs;
        set({
            cvs: cvs.map((cv) =>
                cv.id === cvId
                    ? {
                        ...cv,
                        skills: cv.skills.map((s) =>
                            s.name === skill.name ? skill : s
                        ),
                    }
                    : cv
            ),
        });
    },

    removeSkill: (cvId, skillName) => {
        const cvs = get().cvs;
        set({
            cvs: cvs.map((cv) =>
                cv.id === cvId
                    ? {
                        ...cv,
                        skills: cv.skills.filter((s) => s.name !== skillName),
                    }
                    : cv
            ),
        });
    },
});

