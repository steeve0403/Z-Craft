import {CV, GeneralInfo} from "../../types/cv.ts";
import {StateCreator} from "zustand";

export interface GeneralInfoStore {
    cvs: CV[];
    addGeneralInfo: (cvId: string, generalInfo: GeneralInfo) => void;
    updateGeneralInfo: (cvId: string, generalInfo: GeneralInfo) => void;
    removeGeneralInfo: (cvId: string, generalInfoId: string) => void;
}

export const createGeneralInfoSlice: StateCreator<GeneralInfoStore> = (set, get) => ({
    cvs: [],
    addGeneralInfo: (cvId, generalInfo) => {
        const cvs = get().cvs;
        set({
            cvs: cvs.map((cv) =>
                cv.id === cvId ? { ...cv, generalInfo: [...cv.generalInfo, generalInfo] } : cv
            ),
        });
    },

    updateGeneralInfo: (cvId, generalInfo) => {
        const cvs = get().cvs;
        set({
            cvs: cvs.map((cv) =>
                cv.id === cvId
                    ? {
                        ...cv,
                        generalInfo: cv.generalInfo.map((genInfo) =>
                            genInfo.id === generalInfo.id ? generalInfo : genInfo
                        ),
                    }
                    : cv
            ),
        });
    },

    removeGeneralInfo: (cvId, generalInfoId) => {
        const cvs = get().cvs;
        set({
            cvs: cvs.map((cv) =>
                cv.id === cvId
                    ? {
                        ...cv,
                        generalInfo: cv.generalInfo.filter((genInfo) => genInfo.id !== generalInfoId),
                    }
                    : cv
            ),
        });
    },

});