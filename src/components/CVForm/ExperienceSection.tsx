import React from 'react';
import {CVField} from './CVFormFields';
import {Experience, Section} from '../../types/cv';
import {SectionForm} from './SectionForm';
import {useExperiences} from "../../hooks/sections/useExperiences.ts";

const ExperienceSection: React.FC<Section> = ({cvId, isEditable = true}) => {
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
            addAction={isEditable ? addExperience : undefined}
            updateAction={isEditable ? updateExperience : undefined}
            removeAction={isEditable ? deleteExperience : undefined}
            newItem={newExperience}
            isEditable={isEditable}
        >
            {(index) => (
                <>
                    {isEditable ? (
                        <>
                            <CVField name={`experience.${index}.position`} label="Position"/>
                            <CVField name={`experience.${index}.company`} label="Company"/>
                            <CVField name={`experience.${index}.startDate`} label="Start Date" type="date"/>
                            <CVField name={`experience.${index}.endDate`} label="End Date" type="date"/>
                            <CVField name={`experience.${index}.description`} label="Description" component="textarea"/>
                        </>
                    ) : (
                        <>
                            <p><strong>Position:</strong> {experiences[index]?.position}</p>
                            <p><strong>Company:</strong> {experiences[index]?.company}</p>
                            <p>
                                <strong>Duration:</strong> {experiences[index]?.startDate} - {experiences[index]?.endDate}
                            </p>
                            <p>{experiences[index]?.description}</p>
                        </>
                    )}
                </>
            )}
        </SectionForm>
    );
};

export default ExperienceSection;






