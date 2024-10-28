import { StateCreator } from 'zustand';
import { Education } from '../../types/cv';
import educationService from '../../services/dexie/educationService';

export interface EducationSlice {
    educations: Education[];
    fetchEducations: (cvId: string) => Promise<void>;
    addEducation: (education: Education) => Promise<void>;
    updateEducation: (educationId: string, changes: Partial<Education>) => Promise<void>;
    deleteEducation: (educationId: string) => Promise<void>;
    loading: boolean;
    error: string | null;
}

export const createEducationSlice: StateCreator<EducationSlice> = (set) => ({
    educations: [],
    loading: false,
    error: null,

    fetchEducations: async (cvId) => {
        set({ loading: true, error: null });
        try {
            const educations = await educationService.getEducationsByCVId(cvId);
            set({ educations, loading: false });
        } catch (error) {
            set({ error: 'Error fetching educations', loading: false });
        }
    },

    addEducation: async (education) => {
        set({ loading: true, error: null });
        try {
            await educationService.addEducation(education);
            set((state) => ({ educations: [...state.educations, education], loading: false }));
        } catch (error) {
            set({ error: 'Error adding education', loading: false });
        }
    },

    updateEducation: async (educationId, changes) => {
        set({ loading: true, error: null });
        try {
            await educationService.updateEducation(educationId, changes);
            set((state) => ({
                educations: state.educations.map((edu) =>
                    edu.id === educationId ? { ...edu, ...changes } : edu
                ),
                loading: false,
            }));
        } catch (error) {
            set({ error: 'Error updating education', loading: false });
        }
    },

    deleteEducation: async (educationId) => {
        set({ loading: true, error: null });
        try {
            await educationService.deleteEducation(educationId);
            set((state) => ({
                educations: state.educations.filter((edu) => edu.id !== educationId),
                loading: false,
            }));
        } catch (error) {
            set({ error: 'Error deleting education', loading: false });
        }
    },
});
