import {CV, Experience} from '../../types/cv';
import { StateCreator } from 'zustand';

export interface ExperienceStore {
    cvs:CV[];
    addExperience: (cvId: string, experience: Experience) => void;
    updateExperience: (cvId: string, experience: Experience) => void;
    removeExperience: (cvId: string, experienceId: string) => void;
}

export const createExperienceSlice: StateCreator<ExperienceStore> = (set, get) => ({
    cvs: [],
    addExperience: (cvId, experience) => {
        const cvs = get().cvs;
        set({
            cvs: cvs.map((cv) =>
                cv.id === cvId ? { ...cv, experience: [...cv.experience, experience] } : cv
            ),
        });
    },

    updateExperience: (cvId, experience) => {
        const cvs = get().cvs;
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

    removeExperience: (cvId, experienceId) => {
        const cvs = get().cvs;
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
