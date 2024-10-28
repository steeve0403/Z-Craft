// src/stores/slices/useCVSlice.ts
import {StateCreator} from 'zustand';
import {CV} from '../../types/cv';
import cvService from '../../services/dexie/cvService';

export interface CVSlice {
    cvs: CV[];
    loading: boolean;
    error: string | null;
    fetchCVs: () => Promise<void>;
    addCV: (cv: CV) => Promise<void>;
    updateCV: (cvId: string, changes: Partial<CV>) => Promise<void>;
    deleteCV: (id: string) => Promise<void>;
}

export const createCVSlice: StateCreator<CVSlice> = (set) => ({
    cvs: [],
    loading: false,
    error: null,

    fetchCVs: async () => {
        set({loading: true, error: null});
        try {
            const allCVs = await cvService.getAllCVs();
            set({cvs: allCVs, loading: false});
        } catch (error) {
            set({error: 'Error fetching CVs', loading: false});
        }
    },

    addCV: async (cv) => {
        set({loading: true, error: null});
        try {
            await cvService.addCV(cv);
            set((state) => ({cvs: [...state.cvs, cv], loading: false}));
        } catch (error) {
            console.error(error, 'Error adding CV');
            set({error: 'Error adding CV', loading: false});
        }
    },

    updateCV: async (cvId, changes) => {
        set({loading: true, error: null});
        try {
            // Récupération du CV existant via `getCVById`
            const existingCV = await cvService.getCVById(cvId);
            if (!existingCV) {
                throw new Error(`CV with ID ${cvId} not found`);
            }

            // Fusion des modifications avec le CV existant
            const updatedCV = {...existingCV, ...changes, id: cvId};

            await cvService.upsertCV(updatedCV);
            set((state) => ({
                cvs: state.cvs.map((cv) => (cv.id === cvId ? updatedCV : cv)),
                loading: false,
            }));
        } catch (error) {
            set({error: 'Error updating CV', loading: false});
        }
    },

    deleteCV: async (id) => {
        set({loading: true, error: null});
        try {
            await cvService.deleteCV(id);
            set((state) => ({
                cvs: state.cvs.filter((cv) => cv.id !== id),
                loading: false,
            }));
        } catch (error) {
            set({error: 'Error deleting CV', loading: false});
        }
    },
});



