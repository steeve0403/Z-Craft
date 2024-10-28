import React from 'react';
import {useEducations} from '../../hooks/sections/useEducations';
import {CVField} from './CVFormFields';
import {SectionForm} from './SectionForm';
import {Education, Section} from '../../types/cv';

const EducationSection: React.FC<Section> = ({cvId, isEditable = true}) => {
    const {
        educations,
        addEducation,
        updateEducation,
        deleteEducation,
    } = useEducations(cvId);

    const newEducation: Education = {
        id: Date.now().toString(),
        cvId,
        institution: '',
        degree: '',
        field: '',
        graduationDate: '',
        description: '',
    };

    return (
        <SectionForm<Education>
            name="education"
            fieldsData={educations}
            addAction={addEducation}
            updateAction={updateEducation}
            removeAction={deleteEducation}
            newItem={newEducation}
            isEditable={isEditable}
        >
            {(index) => (
                <>
                    {isEditable ? (
                        <>
                            <CVField name={`education.${index}.institution`} label="Institution"/>
                            <CVField name={`education.${index}.degree`} label="Degree"/>
                            <CVField name={`education.${index}.field`} label="Field of Study"/>
                            <CVField name={`education.${index}.graduationDate`} label="Graduation Date" type="date"/>
                            <CVField name={`education.${index}.description`} label="Description" component="textarea"/>
                        </>
                    ) : (
                        <>
                            <p><strong>Institution:</strong> {educations[index]?.institution}</p>
                            <p><strong>Degree:</strong> {educations[index]?.degree}</p>
                            <p><strong>Field of Study:</strong> {educations[index]?.field}</p>
                            <p><strong>Graduation Date:</strong> {educations[index]?.graduationDate}</p>
                            <p>{educations[index]?.description}</p>
                        </>
                    )}
                </>
            )}

        </SectionForm>
    );
};

export default EducationSection;


