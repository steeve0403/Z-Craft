import Dexie, { Table } from 'dexie';
import {CV, GeneralInfo, Experience, Education, Skill, Language, Template} from "../types/cv.ts";

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
            cvs: 'id, title, createdAt, updatedAt',
            generalInfo: 'id, cvId, firstName, lastName, title, address, email, phone',
            experience: 'id, cvId, company, position, startDate, endDate',
            education: 'id, cvId, institution, degree, field, graduationDate',
            skill: 'id, cvId, name, proficiency',
            language: 'id, cvId, name, proficiency',
            template: 'id, title',
        });
    }
}

const db = new CVDatabase();
export default db;
