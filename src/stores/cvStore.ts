import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {createCVSlice, CVSlice} from './slices/useCVSlice';
import {createExperienceSlice, ExperienceSlice} from './slices/useExperienceSlice';
import {createEducationSlice, EducationSlice} from "./slices/useEducationSlice.ts";
import {createGeneralInfoSlice, GeneralInfoSlice} from "./slices/useGeneralInfoSlice.ts";
import {createLanguageSlice, LanguageSlice} from "./slices/useLanguageSlice.ts";
import {createSkillSlice, SkillSlice} from "./slices/useSkillsSlice.ts";

type CombinedStore = CVSlice & ExperienceSlice & EducationSlice & GeneralInfoSlice & LanguageSlice & SkillSlice;

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
        }
    )
);

