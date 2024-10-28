import { StateCreator } from 'zustand';
import { Skill } from '../../types/cv';
import skillService from '../../services/dexie/skillService';

export interface SkillSlice {
    skills: Skill[];
    fetchSkills: (cvId: string) => Promise<void>;
    addSkill: (skill: Skill) => Promise<void>;
    updateSkill: (skillId: string, changes: Partial<Skill>) => Promise<void>;
    deleteSkill: (skillId: string) => Promise<void>;
    loading: boolean;
    error: string | null;
}

export const createSkillSlice: StateCreator<SkillSlice> = (set) => ({
    skills: [],
    loading: false,
    error: null,

    fetchSkills: async (cvId) => {
        set({ loading: true, error: null });
        try {
            const skills = await skillService.getSkillsByCVId(cvId);
            set({ skills, loading: false });
        } catch (error) {
            set({ error: 'Error fetching skills', loading: false });
        }
    },

    addSkill: async (skill) => {
        set({ loading: true, error: null });
        try {
            await skillService.addSkill(skill);
            set((state) => ({ skills: [...state.skills, skill], loading: false }));
        } catch (error) {
            set({ error: 'Error adding skill', loading: false });
        }
    },

    updateSkill: async (skillId, changes) => {
        set({ loading: true, error: null });
        try {
            await skillService.updateSkill(skillId, changes);
            set((state) => ({
                skills: state.skills.map((skill) =>
                    skill.id === skillId ? { ...skill, ...changes } : skill
                ),
                loading: false,
            }));
        } catch (error) {
            set({ error: 'Error updating skill', loading: false });
        }
    },

    deleteSkill: async (skillId) => {
        set({ loading: true, error: null });
        try {
            await skillService.deleteSkill(skillId);
            set((state) => ({
                skills: state.skills.filter((skill) => skill.id !== skillId),
                loading: false,
            }));
        } catch (error) {
            set({ error: 'Error deleting skill', loading: false });
        }
    },
});
