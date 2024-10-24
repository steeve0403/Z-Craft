import {CV, Education} from '../../types/cv';
import { StateCreator } from 'zustand';

export interface EducationStore {
    cvs: CV[];
    addEducation: (cvId: string, education: Education) => void;
    updateEducation: (cvId: string, education: Education) => void;
    removeEducation: (cvId: string, educationId: string) => void;
}

export const createEducationSlice: StateCreator<EducationStore> = (set, get) => ({
    cvs: [],
    addEducation: (cvId, education) => {
        const cvs = get().cvs;
        set({
            cvs: cvs.map((cv) =>
                cv.id === cvId ? { ...cv, education: [...cv.education, education] } : cv
            ),
        });
    },

    updateEducation: (cvId, education) => {
        const cvs = get().cvs;
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

    removeEducation: (cvId, educationId) => {
        const cvs = get().cvs;
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
