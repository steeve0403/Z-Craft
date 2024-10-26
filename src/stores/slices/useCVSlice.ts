import {StateCreator} from 'zustand';
import {CV} from '../../types/cv';
import cvService from '../../services/dexie/cvService';
import {useLiveQuery} from "dexie-react-hooks";

export interface CVSlice {
    cvs: CV[];
    loading: boolean;
    error: string | null;
    useFetchCVs: () => CV[] | undefined;
    addCV: (cv: CV) => Promise<void>;
    updateCV: (cvId: string, changes: Partial<CV>) => Promise<void>;
    deleteCV: (id: string) => Promise<void>;
}

export const createCVSlice: StateCreator<CVSlice> = (set) => ({
    cvs: [],
    loading: false,
    error: null,

    useFetchCVs: () => {
        const cvs = useLiveQuery(async () => {
            set({ loading: true, error: null });
            try {
                const allCVs = await cvService.getAllCVs();
                set({ cvs: allCVs, loading: false });
            } catch (error) {
                set({ error: "Erreur lors du chargement des CVs.", loading: false });
            }
        }, []);
        return cvs || [];
    },

    addCV: async (cv) => {
        set({loading: true, error: null});
        try {
            await cvService.addCV(cv);
            set((state) => ({cvs: [...state.cvs, cv]}));
        } catch (error) {
            set({error: 'Error while adding CV'});
        } finally {
            set({loading: false});
        }
    },

    updateCV: async (cvId, changes) => {
        set({loading: true, error: null});
        try {
            await cvService.updateCV(cvId, changes);
            set((state) => ({
                cvs: state.cvs.map((existingCV) =>
                    existingCV.id === cvId ? {...existingCV, ...changes} : existingCV
                ),
            }));
        } catch (error) {
            set({error: 'Error while updating CV'});
        } finally {
            set({loading: false});
        }
    },

    deleteCV: async (id) => {
        set({loading: true, error: null});
        try {
            await cvService.deleteCV(id);
            set((state) => ({
                cvs: state.cvs.filter((cv) => cv.id !== id),
            }));
        } catch (error) {
            set({error: 'Error while deleting CV'});
        } finally {
            set({loading: false});
        }
    },
});
