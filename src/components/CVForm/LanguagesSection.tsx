import React from 'react';
import {CVField} from './CVFormFields';
import {Language, Section} from '../../types/cv';
import {SectionForm} from './SectionForm';
import {useLanguages} from "../../hooks/sections/useLanguages.ts";

const LanguagesSection: React.FC<Section> = ({cvId, isEditable = true}) => {
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
            isEditable={isEditable}
        >
            {(index) => (
                <>
                    {isEditable ? (
                        <>
                            <CVField name={`languages.${index}.name`} label="Language"/>
                            <CVField
                                name={`languages.${index}.proficiency`}
                                label="Proficiency"
                                component="input"
                                type="text"
                            />
                        </>
                    ) : (
                        <>
                            <p><strong>Language:</strong> {languages[index]?.name}</p>
                            <p><strong>Proficiency:</strong> {languages[index]?.proficiency}</p>
                        </>
                    )}
                </>
            )}
        </SectionForm>
    );
};

export default LanguagesSection;
