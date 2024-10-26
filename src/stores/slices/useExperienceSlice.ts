import {StateCreator} from 'zustand';
import {Experience} from '../../types/cv';
import experienceService from '../../services/dexie/experienceService';
import {useLiveQuery} from "dexie-react-hooks";

export interface ExperienceSlice {
    experiences: Experience[];
    loading: boolean;
    error: string | null;
    useFetchExperiencesByCVId: (cvId: string) => Experience[] | undefined;
    addExperience: (experience: Experience) => Promise<void>;
    updateExperience: (experienceId: string, changes: Partial<Experience>) => Promise<void>;
    deleteExperience: (experienceId: string) => Promise<void>;

}

export const createExperienceSlice: StateCreator<ExperienceSlice> = (set) => ({
    experiences: [],
    loading: false,
    error: null,

    useFetchExperiencesByCVId: (cvId) => {
        const experiences = useLiveQuery(async () => {
            set({ loading: true, error: null });
            try {
                const experienceList = await experienceService.getExperiencesByCVId(cvId);
                set({ experiences: experienceList, loading: false });
            } catch (error) {
                set({ error: "Erreur lors du chargement des expériences.", loading: false });
            }
        }, [cvId]);
        return experiences || [];
    },

    addExperience: async (experience) => {
        set({loading: true, error: null});
        try {
            await experienceService.addExperience(experience);
            set((state) => ({
                experiences: [...state.experiences, experience],
            }));
        } catch (error) {
            set({error: 'Error while adding the experience'});
        } finally {
            set({loading: false});
        }
    },

    updateExperience: async (experienceId, changes) => {
        set({loading: true, error: null});
        try {
            await experienceService.updateExperience(experienceId, changes);
            set((state) => ({
                experiences: state.experiences.map((exp) =>
                    exp.id === experienceId ? {...exp, ...changes} : exp
                ),
            }));
        } catch (error) {
            set({error: 'Error while updating the experience'});
        } finally {
            set({loading: false});
        }

    },

    deleteExperience: async (experienceId) => {
        set({loading: true, error: null});
        try {
            await experienceService.deleteExperience(experienceId);
            set((state) => ({
                experiences: state.experiences.filter((exp) => exp.id !== experienceId),
            }));
        } catch (error) {
            set({error: 'Error while deleting the experience'});
        } finally {
            set({loading: false});
        }
    },
});


