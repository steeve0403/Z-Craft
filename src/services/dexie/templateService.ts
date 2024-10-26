import {db} from '../../db/dexieConfig.ts';
import {Template} from '../../types/cv.ts';

export const addTemplate = async (template: Template): Promise<void> => {
    await db.templates.add(template);
};

export const updateTemplate = async (templateId: string, changes: Partial<Template>): Promise<void> => {
    await db.templates.update(templateId, changes);
};

export const deleteTemplate = async (templateId: string): Promise<void> => {
    await db.templates.delete(templateId);
};

export const getTemplate = async (templateId: string): Promise<Template | undefined> => {
    return await db.templates.get(templateId);
};

export const getAllTemplates = async (): Promise<Template[]> => {
    return await db.templates.toArray();
};
