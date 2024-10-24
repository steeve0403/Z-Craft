import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createCVActionsSlice, CVStore } from './slices/useCVActions';
import { createExperienceSlice, ExperienceStore } from './slices/useExperienceSlice';
import { createEducationSlice, EducationStore } from './slices/useEducationSlice';
import { createLanguageSlice, LanguageStore } from './slices/useLanguageSlice';
import { createSkillSlice, SkillStore } from './slices/useSkillsSlice';

type CombinedStore = CVStore & ExperienceStore & EducationStore & LanguageStore & SkillStore;

export const useCVStore = create<CombinedStore>()(
    persist(
        (set, get, store) => ({
            ...createCVActionsSlice(set, get, store),
            ...createExperienceSlice(set, get, store),
            ...createEducationSlice(set, get, store),
            ...createLanguageSlice(set, get, store),
            ...createSkillSlice(set, get, store),
        }),
        {
            name: 'cv-storage',
            version: 1,
        }
    )
);
