import db from '../../db/dexieConfig.ts';
import {Template} from '../../types/cv.ts';

export const addTemplate = async (template: Template): Promise<void> => {
    await db.template.add(template);
};

export const updateTemplate = async (templateId: string, changes: Partial<Template>): Promise<void> => {
    await db.template.update(templateId, changes);
};

export const deleteTemplate = async (templateId: string): Promise<void> => {
    await db.template.delete(templateId);
};

export const getTemplate = async (templateId: string): Promise<Template | undefined> => {
    return await db.template.get(templateId);
};

export const getAllTemplates = async (): Promise<Template[]> => {
    return await db.template.toArray();
};
