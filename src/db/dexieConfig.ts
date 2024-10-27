// src/db/dexieConfig.ts
import Dexie, {Table} from 'dexie';
import {CV, GeneralInfo, Experience, Education, Skill, Language, Template} from '../types/cv';

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

        // Version 1 - Initial setup of tables with primary indexes
        this.version(1).stores({
            cvs: 'id, title, createdAt, updatedAt',
            generalInfo: 'id, cvId, firstName, lastName, title, address, email, phone',
            experience: 'id, cvId, company, position, startDate, endDate',
            education: 'id, cvId, institution, degree, field, graduationDate',
            skill: 'id, cvId, name, proficiency',
            language: 'id, cvId, name, proficiency',
            template: 'id, title',
        });

        // Future version example (e.g., version 2) to add a new field or change indexes
        // this.version(2).stores({
        //     cvs: 'id, title, createdAt, updatedAt, status',  // Adds a `status` field
        // });

        // Optionally, link each table to a TypeScript class to add custom methods
        // this.cvs.mapToClass(CV);  // Example if you create a CV class with custom methods
    }
}

const db = new CVDatabase();
export default db;

