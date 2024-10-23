// stores/slices/useExperienceSlice.ts
import {CV, Experience} from '../../types/cv';
import { StateCreator } from 'zustand';

export interface ExperienceStore {
    cvs:CV[];
    addExperience: (cvId: string, experience: Experience) => void;
    updateExperience: (cvId: string, experience: Experience) => void;
    removeExperience: (cvId: string, experienceId: string) => void;
}

export const createExperienceSlice: StateCreator<ExperienceStore> = (set, get, store) => ({
    cvs: [],
    // Ajouter une expérience dans un CV spécifique
    addExperience: (cvId, experience) => {
        const cvs = get().cvs; // Récupérer l'état global des CVs
        set({
            cvs: cvs.map((cv) =>
                cv.id === cvId ? { ...cv, experience: [...cv.experience, experience] } : cv
            ),
        });
    },

    // Mettre à jour une expérience existante dans un CV
    updateExperience: (cvId, experience) => {
        const cvs = get().cvs; // Récupérer l'état global des CVs
        set({
            cvs: cvs.map((cv) =>
                cv.id === cvId
                    ? {
                        ...cv,
                        experience: cv.experience.map((exp) =>
                            exp.id === experience.id ? experience : exp
                        ),
                    }
                    : cv
            ),
        });
    },

    // Supprimer une expérience d'un CV
    removeExperience: (cvId, experienceId) => {
        const cvs = get().cvs; // Récupérer l'état global des CVs
        set({
            cvs: cvs.map((cv) =>
                cv.id === cvId
                    ? {
                        ...cv,
                        experience: cv.experience.filter((exp) => exp.id !== experienceId),
                    }
                    : cv
            ),
        });
    },
});
