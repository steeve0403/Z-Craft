import {StateCreator} from 'zustand';
import {Skill} from '../../types/cv';
import skillService from "../../services/dexie/skillService";

export interface SkillSlice {
    skills: Skill[];
    loading: boolean;
    error: string | null;
    fetchSkillsByCVId: (cvId: string) => Promise<void>;
    addSkill: (skill: Skill) => Promise<void>;
    updateSkill: (skillId: string, changes: Partial<Skill>) => Promise<void>;
    deleteSkill: (skillId: string) => Promise<void>;
}

export const createSkillSlice: StateCreator<SkillSlice> = (set) => ({
    skills: [],
    loading: false,
    error: null,

    fetchSkillsByCVId: async (cvId) => {
        set({loading: true, error: null});
        try {
            const skills = await skillService.getSkillsByCVId(cvId);
            set({skills});
        } catch (error) {
            set({error: 'Error while loading skills'});
        } finally {
            set({loading: false});
        }
    },

    addSkill: async (skill) => {
        set({loading: true, error: null});
        try {
            await skillService.addSkill(skill);
            set((state) => ({
                skills: [...state.skills, skill],
            }));
        } catch (error) {
            set({error: 'Error while adding the skill'});
        } finally {
            set({loading: false});
        }
    },

    updateSkill: async (skillId, changes) => {
        set({loading: true, error: null});
        try {
            await skillService.updateSkill(skillId, changes);
            set((state) => ({
                skills: state.skills.map((exp) =>
                    exp.id === skillId ? {...exp, ...changes} : exp
                ),
            }));
        } catch (error) {
            set({error: 'Error while updating the skill'});
        } finally {
            set({loading: false});
        }
    },

    deleteSkill: async (skillId) => {
        set({loading: true, error: null});
        try {
            await skillService.deleteSkill(skillId);
            set((state) => ({
                skills: state.skills.filter((exp) => exp.id !== skillId),
            }));
        } catch (error) {
            set({error: 'Error while deleting the skill'});
        } finally {
            set({loading: false});
        }
    },
});