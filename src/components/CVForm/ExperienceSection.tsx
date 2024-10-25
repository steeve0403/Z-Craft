// components/ExperienceSection.tsx
import React from 'react';
import {CVInputField, CVDateField, CVTextareaField} from './CVFormFields';
import {useCVStore} from '../../stores/cvStore';
import {Experience} from '../../types/cv';
import {SectionForm} from './SectionForm';

const ExperienceSection: React.FC<{ cvId: string }> = ({cvId}) => {
    const {addExperience, updateExperience, removeExperience} = useCVStore();
    const newExperience: Experience = {
        id: Date.now().toString(),
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: ''
    };

    return (
        <SectionForm<Experience>
            name="experience"
            cvId={cvId}
            fieldsData={[]}
            addAction={addExperience}
            updateAction={updateExperience}
            removeAction={removeExperience}
            newItem={newExperience}
        >
            {(index) => (
                <>
                    <CVInputField name={`experience.${index}.company`} label="Entreprise"/>
                    <CVInputField name={`experience.${index}.position`} label="Poste"/>
                    <div className="cv-form__dates">
                        <CVDateField name={`experience.${index}.startDate`} label="Date de début"/>
                        <CVDateField name={`experience.${index}.endDate`} label="Date de fin"/>
                    </div>
                    <CVTextareaField name={`experience.${index}.description`} label="Description"/>
                </>
            )}
        </SectionForm>
    );
};

export default ExperienceSection;




