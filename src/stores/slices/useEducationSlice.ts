import {StateCreator} from 'zustand';
import {Education} from '../../types/cv';
import educationService from '../../services/dexie/educationService';
import {useLiveQuery} from "dexie-react-hooks";

export interface EducationSlice {
    educations: Education[];
    loading: boolean;
    error: string | null;
    useFetchEducationsByCVId: (cvId: string) => Education[] | undefined;
    addEducation: (education: Education) => Promise<void>;
    updateEducation: (educationId: string, changes: Partial<Education>) => Promise<void>;
    deleteEducation: (educationId: string) => Promise<void>;
}

export const createEducationSlice: StateCreator<EducationSlice, []> = (set) => ({
    educations: [],
    loading: false,
    error: null,

    useFetchEducationsByCVId: (cvId) => {
        const educations = useLiveQuery(async () => {
            set({loading: true, error: null});
            try {
                const educations = await educationService.getEducationsByCVId(cvId);
                set({educations});
            } catch (error) {
                set({error: 'Error while loading educations'});
            } finally {
                set({loading: false});
            }

        }, [cvId]);
        return educations || [];
    },

    addEducation: async (education) => {
        set({loading: true, error: null});
        try {
            await educationService.addEducation(education);
            set((state) => ({
                educations: [...state.educations, education],
            }));
        } catch (error) {
            set({error: 'Error while adding the education'});
        } finally {
            set({loading: false});
        }
    },

    updateEducation: async (educationId, changes) => {
        set({loading: true, error: null});
        try {
            await educationService.updateEducation(educationId, changes);
            set((state) => ({
                educations: state.educations.map((edu) =>
                    edu.id === educationId ? {...edu, ...changes} : edu
                ),
            }));
        } catch (error) {
            set({error: 'Error while updating the education'});
        } finally {
            set({loading: false});
        }
    },

    deleteEducation: async (educationId) => {
        set({loading: true, error: null});
        try {
            await educationService.deleteEducation(educationId);
            set((state) => ({
                educations: state.educations.filter((exp) => exp.id !== educationId),
            }));
        } catch (error) {
            set({error: 'Error while deleting the education'});
        } finally {
            set({loading: false});
        }
    },
});
