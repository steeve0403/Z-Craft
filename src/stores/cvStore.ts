import create from 'zustand';
import {persist} from 'zustand/middleware';
import {CV} from '../types/cv';

interface CVStore {
    cvs: CV[];
    addCV: (cv: CV) => void;
    updateCV: (id: string, updatedCV: Partial<CV>) => void;
    deleteCV: (id: string) => void;
    getCVById: (id: string) => CV | undefined;
}

export const useCVStore = create<CVStore>()(
    persist(
        (set, get) => ({
            cvs: [],
            addCV: (cv) => set((state) => ({cvs: state.cvs.concat(cv)})),
            updateCV: (id, updatedCV) =>
                set((state) => ({
                    cvs: state.cvs.map((cv) => (cv.id === id ? {...cv, ...updatedCV} : cv)),
                })),
            deleteCV: (id) => set((state) => ({cvs: state.cvs.filter((cv) => cv.id !== id)})),
            getCVById: (id) => {
                const cv = get().cvs.find((cv) => cv.id === id);
                if (!cv) {
                    console.warn(`CV with id ${id} not found`);
                    return undefined;
                }
                return cv;
            },
        }),
        {
            name: 'cv-storage',
            getStorage: () => localStorage,
        }
    )
);