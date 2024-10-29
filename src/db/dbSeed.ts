import db from './dexieConfig';
import {CV, GeneralInfo, Experience, Education, Skill, Language, Template} from '../types/cv';

/**
 * Populates the database with sample data.
 * This function first checks if the database is empty to avoid data duplication.
 */
export async function seedDatabase(): Promise<void> {
    const currentDate = new Date().toISOString();

    // Check if the database tables are empty
    const isDBEmpty = await Promise.all([
        db.cvs.count(),
        db.generalInfo.count(),
        db.experience.count(),
        db.education.count(),
        db.skill.count(),
        db.language.count(),
        db.template.count(),
    ]).then(counts => counts.every(count => count === 0));

    if (!isDBEmpty) return; // Exit if data already exists

    // Sample CVs and sections for seeding
    const cvs: CV[] = Array.from({length: 5}, (_, i) => ({
        id: `cv${i + 1}`,
        title: `Sample CV ${i + 1}`,
        createdAt: currentDate,
        updatedAt: currentDate,
    }));

    const generalInfos: GeneralInfo[] = cvs.map((cv) => ({
        id: `info-${cv.id}`,
        cvId: cv.id,
        firstname: 'John',
        lastname: 'Doe',
        title: 'Software Engineer',
        address: '123 Main St',
        email: 'johndoe@example.com',
        phone: '555-1234',
        summary: 'Experienced software engineer with expertise in web development.',
    }));

    const experiences: Experience[] = cvs.flatMap((cv) => [
        {
            id: `exp1-${cv.id}`,
            cvId: cv.id,
            company: 'Tech Corp',
            position: 'Developer',
            startDate: '2020-01-01',
            endDate: '2021-01-01',
            description: 'Developed web applications using modern frameworks.',
        },
        {
            id: `exp2-${cv.id}`,
            cvId: cv.id,
            company: 'Soft Solutions',
            position: 'Lead Developer',
            startDate: '2021-02-01',
            endDate: 'Present',
            description: 'Led a team to build scalable software solutions.',
        },
    ]);

    const educations: Education[] = cvs.map((cv) => ({
        id: `edu-${cv.id}`,
        cvId: cv.id,
        institution: 'University of Somewhere',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        graduationDate: '2019-06-01',
        description: 'Specialized in software engineering.',
    }));

    const skills: Skill[] = cvs.flatMap((cv) => [
        {id: `skill1-${cv.id}`, cvId: cv.id, name: 'JavaScript', proficiency: 'Advanced'},
        {id: `skill2-${cv.id}`, cvId: cv.id, name: 'TypeScript', proficiency: 'Intermediate'},
    ]);

    const languages: Language[] = cvs.flatMap((cv) => [
        {id: `lang1-${cv.id}`, cvId: cv.id, name: 'English', proficiency: 'Fluent'},
        {id: `lang2-${cv.id}`, cvId: cv.id, name: 'Spanish', proficiency: 'Beginner'},
    ]);

    const templates: Template[] = [
        {id: 'tmpl1', title: 'Modern Template'},
        {id: 'tmpl2', title: 'Classic Template'},
    ];

    /**
     * Inserts sample data into each table using a transaction for consistency.
     */
    try {
        await db.transaction('rw', [db.cvs, db.generalInfo, db.experience, db.education, db.skill, db.language, db.template], async () => {
            await db.cvs.bulkAdd(cvs);
            await db.generalInfo.bulkAdd(generalInfos);
            await db.experience.bulkAdd(experiences);
            await db.education.bulkAdd(educations);
            await db.skill.bulkAdd(skills);
            await db.language.bulkAdd(languages);
            await db.template.bulkAdd(templates);
        });
        console.log('Database seeded with multiple sample CVs.');
    } catch (error) {
        console.error('Database seeding error:', error);
    }
}

