import { StateCreator } from 'zustand';
import { Experience } from '../../types/cv';
import experienceService from '../../services/dexie/experienceService';

export interface ExperienceSlice {
    experiences: Experience[];
    fetchExperiences: (cvId: string) => Promise<void>;
    addExperience: (experience: Experience) => Promise<void>;
    updateExperience: (experienceId: string, changes: Partial<Experience>) => Promise<void>;
    deleteExperience: (experienceId: string) => Promise<void>;
    loading: boolean;
    error: string | null;
}

export const createExperienceSlice: StateCreator<ExperienceSlice> = (set) => ({
    experiences: [],
    loading: false,
    error: null,

    fetchExperiences: async (cvId) => {
        set({ loading: true, error: null });
        try {
            const experiences = await experienceService.getExperiencesByCVId(cvId);
            set({ experiences, loading: false });
        } catch (error) {
            set({ error: 'Error fetching experiences', loading: false });
        }
    },

    addExperience: async (experience) => {
        set({ loading: true, error: null });
        try {
            await experienceService.addExperience(experience);
            set((state) => ({ experiences: [...state.experiences, experience], loading: false }));
        } catch (error) {
            set({ error: 'Error adding experience', loading: false });
        }
    },

    updateExperience: async (experienceId, changes) => {
        set({ loading: true, error: null });
        try {
            await experienceService.updateExperience(experienceId, changes);
            set((state) => ({
                experiences: state.experiences.map((exp) =>
                    exp.id === experienceId ? { ...exp, ...changes } : exp
                ),
                loading: false,
            }));
        } catch (error) {
            set({ error: 'Error updating experience', loading: false });
        }
    },

    deleteExperience: async (experienceId) => {
        set({ loading: true, error: null });
        try {
            await experienceService.deleteExperience(experienceId);
            set((state) => ({
                experiences: state.experiences.filter((exp) => exp.id !== experienceId),
                loading: false,
            }));
        } catch (error) {
            set({ error: 'Error deleting experience', loading: false });
        }
    },
});



