import db from './dexieConfig';
import {CV, GeneralInfo, Experience, Education, Skill, Language, Template} from '../types/cv';

/**
 * Database population function with dummy data.
 * First check if the base is empty to avoid duplicates.
 */
export async function seedDatabase() {
    // Checks if CVs already exist to avoid duplication of data
    const existingCVs = await db.cvs.toArray();
    if (existingCVs.length > 0) return;

    // Fake data for the `cv` table
    const sampleCV: CV = {
        id: 'cv1',
        title: 'CV John Doe',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    // Fake data for the `generalInfo` table
    const sampleGeneralInfo: GeneralInfo = {
        id: 'info1',
        cvId: 'cv1',
        firstname: 'John',
        lastname: 'Doe',
        title: 'Software Engineer',
        address: '123 Main St',
        email: 'johndoe@example.com',
        phone: '555-1234',
        summary: 'Software engineer with 5 years of experience.',
    };

    // Fake data for the `experience` table
    const sampleExperience: Experience = {
        id: 'exp1',
        cvId: 'cv1',
        company: 'Tech Corp',
        position: 'Developer',
        startDate: '2020-01-01',
        endDate: '2021-01-01',
        description: 'Worked on web development projects.',
    };

    // Fake data for the `education` table
    const sampleEducation: Education = {
        id: 'edu1',
        cvId: 'cv1',
        institution: 'University of Somewhere',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        graduationDate: '2019-06-01',
        description: 'Focused on software engineering courses.',
    };

    // Fake data for the `skill` table
    const sampleSkill: Skill = {
        id: 'skill1',
        cvId: 'cv1',
        name: 'JavaScript',
        proficiency: 'Advanced',
    };

    // Fake data for the `language` table
    const sampleLanguage: Language = {
        id: 'lang1',
        cvId: 'cv1',
        name: 'English',
        proficiency: 'Fluent',
    };

    // Fake data for the `template` table
    const sampleTemplate: Template = {
        id: 'tmpl1',
        title: 'Modern Template',
    };

    /**
     * Inserts dummy data into corresponding database tables
     * using a Dexie transaction.
     */
    await db.transaction('rw', [db.cvs, db.generalInfo, db.experience, db.education, db.skill, db.language, db.template], async () => {
        await db.cvs.add(sampleCV);
        await db.generalInfo.add(sampleGeneralInfo);
        await db.experience.add(sampleExperience);
        await db.education.add(sampleEducation);
        await db.skill.add(sampleSkill);
        await db.language.add(sampleLanguage);
        await db.template.add(sampleTemplate);
    });

    console.log('Database seeded with sample data.');
}

