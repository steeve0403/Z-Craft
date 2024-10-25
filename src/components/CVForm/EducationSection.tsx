// components/EducationSection.tsx
import React from 'react';
import {CVInputField, CVDateField, CVTextareaField} from './CVFormFields';
import {useCVStore} from '../../stores/cvStore';
import {Education} from '../../types/cv';
import {SectionForm} from './SectionForm';

const EducationSection: React.FC<{ cvId: string }> = ({cvId}) => {
    const {addEducation, updateEducation, removeEducation} = useCVStore();
    const newEducation: Education = {
        id: Date.now().toString(),
        institution: '',
        degree: '',
        field: '',
        graduationDate: '',
        description: ''
    };

    return (
        <SectionForm<Education>
            name="education"
            cvId={cvId}
            fieldsData={[]}
            addAction={addEducation}
            updateAction={updateEducation}
            removeAction={removeEducation}
            newItem={newEducation}
        >
            {(index) => (
                <>
                    <CVInputField name={`education.${index}.institution`} label="École"/>
                    <CVInputField name={`education.${index}.degree`} label="Diplôme"/>
                    <CVInputField name={`education.${index}.field`} label="Spécialité"/>
                    <CVDateField name={`education.${index}.graduationDate`} label="Date de diplôme"/>
                    <CVTextareaField name={`education.${index}.description`} label="Description"/>
                </>
            )}
        </SectionForm>
    );
};

export default EducationSection;



