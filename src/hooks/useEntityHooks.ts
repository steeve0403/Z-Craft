import { useCVStore, useExperienceStore, useEducationStore, useSkillStore, useGeneralInfoStore, useLanguageStore } from '../stores';
import { CV, Experience, Education, Skill, GeneralInfo, Language } from '../types/cv';
import {useGenericEntityStore} from "./useGenericStore.ts";

/**
 * Hook to interact with the CV store.
 * @returns All CRUD functions and state properties for CV.
 */
export const useCV = () => {
    return useGenericEntityStore<CV>(useCVStore);
};

/**
 * Hook to interact with the Experience store.
 * @returns All CRUD functions and state properties for Experience.
 */
export const useExperience = () => {
    return useGenericEntityStore<Experience>(useExperienceStore);
};

/**
 * Hook to interact with the Education store.
 * @returns All CRUD functions and state properties for Education.
 */
export const useEducation = () => {
    return useGenericEntityStore<Education>(useEducationStore);
};

/**
 * Hook to interact with the Skill store.
 * @returns All CRUD functions and state properties for Skill.
 */
export const useSkill = () => {
    return useGenericEntityStore<Skill>(useSkillStore);
};

/**
 * Hook to interact with the GeneralInfo store.
 * @returns All CRUD functions and state properties for GeneralInfo.
 */
export const useGeneralInfo = () => {
    return useGenericEntityStore<GeneralInfo>(useGeneralInfoStore);
};

/**
 * Hook to interact with the Language store.
 * @returns All CRUD functions and state properties for Language.
 */
export const useLanguage = () => {
    return useGenericEntityStore<Language>(useLanguageStore);
};

