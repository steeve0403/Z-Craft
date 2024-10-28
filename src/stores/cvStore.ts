import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {createCVSlice, CVSlice} from './slices/useCVSlice';
import {createExperienceSlice, ExperienceSlice} from './slices/useExperienceSlice';
import {createEducationSlice, EducationSlice} from "./slices/useEducationSlice.ts";
import {createGeneralInfoSlice, GeneralInfoSlice} from "./slices/useGeneralInfoSlice.ts";
import {createLanguageSlice, LanguageSlice} from "./slices/useLanguageSlice.ts";
import {createSkillSlice, SkillSlice} from "./slices/useSkillsSlice.ts";

type CombinedStore = CVSlice & ExperienceSlice & EducationSlice & GeneralInfoSlice & LanguageSlice & SkillSlice;

const errorHandler = (error: Error) => {
    console.error("Error in CV store:", error);
    if (error.message.includes("ConstraintError") || error.message.includes("indexedDB")) {
        // Réinitialisation de localStorage pour éviter les erreurs persistantes
        localStorage.removeItem("cv-storage");
        window.location.reload(); // Recharger l'application pour une nouvelle initialisation
    }
};

export const useCVStore = create<CombinedStore>()(
    persist(
        (...args) => ({
            ...createCVSlice(...args),
            ...createGeneralInfoSlice(...args),
            ...createExperienceSlice(...args),
            ...createEducationSlice(...args),
            ...createLanguageSlice(...args),
            ...createSkillSlice(...args),
        }),
        {
            name: 'cv-storage',
            version: 1,
            onRehydrateStorage: () => {
                try {
                    // Détecter les erreurs possibles lors du chargement du store
                    console.log("Rehydrating CV store...");
                } catch (error) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    errorHandler(error);
                }
            },
        }
    )
);

