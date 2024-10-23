import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createCVActionsSlice, CVStore } from './slices/useCVActions';
import { createExperienceSlice, ExperienceStore } from './slices/useExperienceSlice';
import { createEducationSlice, EducationStore } from './slices/useEducationSlice';
import { createLanguageSlice, LanguageStore } from './slices/useLanguageSlice';
import { createSkillSlice, SkillStore } from './slices/useSkillsSlice';

// Combine tous les slices dans un type unique
type CombinedStore = CVStore & ExperienceStore & EducationStore & LanguageStore & SkillStore;

export const useCVStore = create<CombinedStore>()(
    persist(
        (set, get, store) => ({
            // Appel des slices avec les trois arguments : set, get et store
            ...createCVActionsSlice(set, get, store),
            ...createExperienceSlice(set, get, store),
            ...createEducationSlice(set, get, store),
            ...createLanguageSlice(set, get, store),
            ...createSkillSlice(set, get, store),
        }),
        {
            name: 'cv-storage', // Nom dans localStorage
            version: 1, // Version pour les futures migrations
        }
    )
);
