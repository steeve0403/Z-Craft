import {createGenericStore} from './genericStore';
import {CV, GeneralInfo, Experience, Education, Skill, Language, Template} from '../types/cv';
import {
    cvService,
    generalInfoService,
    experienceService,
    educationService,
    skillService,
    languageService,
    templateService
} from '../services';

// Store for managing CVs
export const useCVStore = createGenericStore<CV>(cvService);

// Store for managing GeneralInfo sections
export const useGeneralInfoStore = createGenericStore<GeneralInfo>(generalInfoService);

// Store for managing Experience sections
export const useExperienceStore = createGenericStore<Experience>(experienceService);

// Store for managing Education sections
export const useEducationStore = createGenericStore<Education>(educationService);

// Store for managing Skill sections
export const useSkillStore = createGenericStore<Skill>(skillService);

// Store for managing Language sections
export const useLanguageStore = createGenericStore<Language>(languageService);

// Store for managing Template sections
export const useTemplateStore = createGenericStore<Template>(templateService);



