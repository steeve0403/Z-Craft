import Dexie, { Table } from 'dexie';
import { CV, GeneralInfo, Experience, Education, Skill, Language, Template } from '../types/cv';

// Table names for centralization and consistency
const TABLE_NAMES = {
    cvs: 'cvs',
    generalInfo: 'generalInfo',
    experience: 'experience',
    education: 'education',
    skill: 'skill',
    language: 'language',
    template: 'template',
};

/**
 * Main database class extending Dexie, representing the structure and schema of the CV database.
 */
export class CVDatabase extends Dexie {
    cvs!: Table<CV>;
    generalInfo!: Table<GeneralInfo>;
    experience!: Table<Experience>;
    education!: Table<Education>;
    skill!: Table<Skill>;
    language!: Table<Language>;
    template!: Table<Template>;

    constructor() {
        super('CVDatabase');

        this.version(1).stores({
            [TABLE_NAMES.cvs]: 'id, title, createdAt, updatedAt',  // Primary table for CVs
            [TABLE_NAMES.generalInfo]: 'id, cvId, firstName, lastName, title, address, email, phone',  // Indexed by cvId for relation to CV
            [TABLE_NAMES.experience]: 'id, cvId, company, position, startDate, endDate, [cvId+position]',  // Combined index for efficient search
            [TABLE_NAMES.education]: 'id, cvId, institution, degree, field, graduationDate, [cvId+degree]',  // Combined index
            [TABLE_NAMES.skill]: 'id, cvId, name, proficiency',  // Indexed by cvId
            [TABLE_NAMES.language]: 'id, cvId, name, proficiency',  // Indexed by cvId
            [TABLE_NAMES.template]: 'id, title, description, createdAt',  // Metadata about templates
        });

        // Map the CV class for custom methods
        this.cvs.mapToClass(CVClass);
    }

    /**
     * Transaction for creating a new CV along with its related sections.
     * This ensures atomicity and consistency in case of any failure.
     */
    async createCVWithSections(cv: CV, generalInfo: GeneralInfo, experiences: Experience[], educations: Education[], skills: Skill[], languages: Language[]) {
        try {
            await this.transaction('rw', [this.cvs, this.generalInfo, this.experience, this.education, this.skill, this.language], async () => {
                // Add CV
                await this.cvs.add(cv);

                // Add related sections
                await this.generalInfo.add(generalInfo);
                await this.experience.bulkAdd(experiences);
                await this.education.bulkAdd(educations);
                await this.skill.bulkAdd(skills);
                await this.language.bulkAdd(languages);
            });
            console.log('CV and sections added successfully!');
        } catch (error) {
            console.error('Failed to create CV with sections:', error);
        }
    }
}

/**
 * Custom CV class to add specific methods for CVs.
 */
class CVClass {
    id!: string;
    title!: string;
    createdAt!: string;
    updatedAt!: string;

    /**
     * Returns a formatted creation date.
     */
    getFormattedDate() {
        return new Date(this.createdAt).toLocaleDateString();
    }

    /**
     * Returns a time difference in days since last update.
     * Useful for tracking if a CV has been recently updated.
     */
    daysSinceLastUpdate() {
        const lastUpdate = new Date(this.updatedAt);
        const today = new Date();
        return Math.ceil((today.getTime() - lastUpdate.getTime()) / (1000 * 3600 * 24));
    }
}

// Export the initialized database
const db = new CVDatabase();
export default db;

