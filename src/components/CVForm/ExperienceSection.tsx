import React from 'react';
import {CVField} from './CVFormFields';
import {Experience} from '../../types/cv';
import {SectionForm} from './SectionForm';
import {useExperiences} from "../../hooks/sections/useExperiences.ts";

const ExperienceSection: React.FC<{ cvId: string }> = ({cvId}) => {
    const {
        experiences,
        addExperience,
        updateExperience,
        deleteExperience
    } = useExperiences(cvId);

    const newExperience: Experience = {
        id: Date.now().toString(),
        cvId,
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
    };

    return (
        <SectionForm<Experience>
            name="experience"
            fieldsData={experiences}
            addAction={addExperience}
            updateAction={updateExperience}
            removeAction={deleteExperience}
            newItem={newExperience}
        >
            {(index) => (
                <>
                    <CVField name={`experience.${index}.company`} label="Company"/>
                    <CVField name={`experience.${index}.position`} label="Position"/>
                    <CVField name={`experience.${index}.startDate`} label="Start Date" type="date"/>
                    <CVField name={`experience.${index}.endDate`} label="End Date" type="date"/>
                    <CVField name={`experience.${index}.description`} label="Description" component="textarea"/>
                </>
            )}
        </SectionForm>
    );
};

export default ExperienceSection;






