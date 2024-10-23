import { CV } from '../../types/cv'; // Import des types
import { StateCreator } from 'zustand';

// Interface pour les actions sur les CV
export interface CVStore {
    cvs: CV[];
    addCV: (cv: CV) => void;
    updateCV: (id: string, updatedCV: Partial<CV>) => void;
    deleteCV: (id: string) => void;
    getCVById: (id: string) => CV | undefined;
}

// Création des actions liées aux CVs
export const createCVActionsSlice: StateCreator<CVStore> = (set, get, store) => ({
    cvs: [],

    addCV: (cv) => set((state) => ({
        cvs: [...state.cvs, cv],
    })),

    updateCV: (id, updatedCV) =>
        set((state) => ({
            cvs: state.cvs.map((cv) => (cv.id === id ? { ...cv, ...updatedCV } : cv)),
        })),

    deleteCV: (id) =>
        set((state) => ({
            cvs: state.cvs.filter((cv) => cv.id !== id),
        })),

    getCVById: (id) => get().cvs.find((cv) => cv.id === id),
});

/*
- stores
    - slices
        // Interface pour les actions sur les CV
        // Création des actions liées aux CVs
        - useCVActions.ts
        - useEducationSlice.ts
        - useExperienceSlice.ts
        - useLanguageSlice.ts
        - useSkillsSlice.ts
    // Combine tous les slices dans un type unique
    - cvStores.ts
*/