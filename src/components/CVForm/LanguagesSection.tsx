// components/LanguagesSection.tsx
import React from 'react';
import { CVInputField } from './CVFormFields';
import { useCVStore } from '../../stores/cvStore';
import { Language } from '../../types/cv';
import { SectionForm } from './SectionForm';

const LanguagesSection: React.FC<{ cvId: string }> = ({ cvId }) => {
    const { addLanguage, updateLanguage, removeLanguage } = useCVStore();
    const newLanguage: Language = { id: Date.now().toString(), name: '', proficiency: 'Beginner' };

    return (
        <SectionForm<Language>
            name="languages"
            cvId={cvId}
            fieldsData={[]}
            addAction={addLanguage}
            updateAction={updateLanguage}
            removeAction={removeLanguage}
            newItem={newLanguage}
        >
            {(index) => (
                <>
                    <CVInputField name={`languages.${index}.name`} label="Langue" />
                    <CVInputField name={`languages.${index}.proficiency`} label="Niveau" />
                </>
            )}
        </SectionForm>
    );
};

export default LanguagesSection;



