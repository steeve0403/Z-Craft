import React from 'react';
import {useEducations} from '../../hooks/sections/useEducations';
import {CVField} from './CVFormFields';
import {SectionForm} from './SectionForm';
import {Education} from '../../types/cv';

const EducationSection: React.FC<{ cvId: string }> = ({cvId}) => {
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
        >
            {(index) => (
                <>
                    <CVField name={`education.${index}.institution`} label="Institution"/>
                    <CVField name={`education.${index}.degree`} label="Degree"/>
                    <CVField name={`education.${index}.field`} label="Field of Study"/>
                    <CVField name={`education.${index}.graduationDate`} label="Graduation Date" type="date"/>
                    <CVField name={`education.${index}.description`} label="Description" component="textarea"/>
                </>
            )}
        </SectionForm>
    );
};

export default EducationSection;


