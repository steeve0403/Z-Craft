import {GenericService} from './genericService';
import db from '../db/dexieConfig';
import {CV, Education, Experience, Skill, GeneralInfo, Language, Template} from '../types/cv';

/**
 * Consolidated services for interacting with Dexie tables.
 * Provides methods to perform CRUD operations on various records.
 */
export const cvService = new GenericService<CV>(db.cvs);
export const generalInfoService = new GenericService<GeneralInfo>(db.generalInfo);
export const educationService = new GenericService<Education>(db.education);
export const experienceService = new GenericService<Experience>(db.experience);
export const skillService = new GenericService<Skill>(db.skill);
export const languageService = new GenericService<Language>(db.language);
export const templateService = new GenericService<Template>(db.template);

export default {
    cvService,
    generalInfoService,
    educationService,
    experienceService,
    skillService,
    languageService,
    templateService,
};
