import React from 'react';
import {CVField} from './CVFormFields';
import {Language} from '../../types/cv';
import {SectionForm} from './SectionForm';
import {useLanguages} from "../../hooks/sections/useLanguages.ts";

const LanguagesSection: React.FC<{ cvId: string }> = ({cvId}) => {
    const {
        languages,
        addLanguage,
        updateLanguage,
        deleteLanguage
    } = useLanguages(cvId);

    const newLanguage: Language = {
        id: Date.now().toString(),
        cvId,
        name: '',
        proficiency: 'Beginner',
    }

    return (
        <SectionForm<Language>
            name="languages"
            fieldsData={languages}
            addAction={addLanguage}
            updateAction={updateLanguage}
            removeAction={deleteLanguage}
            newItem={newLanguage}
        >
            {(index) => (
                <>
                    <CVField name={`languages.${index}.name`} label="Language"/>
                    <CVField
                        name={`languages.${index}.proficiency`}
                        label="Proficiency"
                        component="input"
                        type="text"
                    />
                </>
            )}
        </SectionForm>
    );
};

export default LanguagesSection;
