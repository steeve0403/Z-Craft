// stores/slices/useEducationSlice.ts
import {CV, Education} from '../../types/cv';
import { StateCreator } from 'zustand';

export interface EducationStore {
    cvs: CV[];
    addEducation: (cvId: string, education: Education) => void;
    updateEducation: (cvId: string, education: Education) => void;
    removeEducation: (cvId: string, educationId: string) => void;
}

export const createEducationSlice: StateCreator<EducationStore> = (set, get, store) => ({
    cvs: [],
    // Ajouter une éducation dans un CV spécifique
    addEducation: (cvId, education) => {
        const cvs = get().cvs; // Récupérer l'état global des CVs
        set({
            cvs: cvs.map((cv) =>
                cv.id === cvId ? { ...cv, education: [...cv.education, education] } : cv
            ),
        });
    },

    // Mettre à jour une éducation existante dans un CV
    updateEducation: (cvId, education) => {
        const cvs = get().cvs; // Récupérer l'état global des CVs
        set({
            cvs: cvs.map((cv) =>
                cv.id === cvId
                    ? {
                        ...cv,
                        education: cv.education.map((edu) =>
                            edu.id === education.id ? education : edu
                        ),
                    }
                    : cv
            ),
        });
    },

    // Supprimer une éducation d'un CV
    removeEducation: (cvId, educationId) => {
        const cvs = get().cvs; // Récupérer l'état global des CVs
        set({
            cvs: cvs.map((cv) =>
                cv.id === cvId
                    ? {
                        ...cv,
                        education: cv.education.filter((edu) => edu.id !== educationId),
                    }
                    : cv
            ),
        });
    },
});
