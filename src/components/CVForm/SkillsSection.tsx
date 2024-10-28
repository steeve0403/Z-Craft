import React from 'react';
import {CVField} from './CVFormFields';
import {Section, Skill} from '../../types/cv';
import {SectionForm} from './SectionForm';
import {useSkills} from "../../hooks/sections/useSkills.ts";

const SkillsSection: React.FC<Section> = ({cvId, isEditable = true}) => {
    const {
        skills,
        addSkill,
        updateSkill,
        deleteSkill
    } = useSkills(cvId);

    const newSkill: Skill = {
        id: Date.now().toString(),
        cvId,
        name: '',
        proficiency: 'Beginner',
    }

    return (
        <SectionForm<Skill>
            name="skills"
            fieldsData={skills}
            addAction={addSkill}
            updateAction={updateSkill}
            removeAction={deleteSkill}
            newItem={newSkill}
            isEditable={isEditable}
        >
            {(index) => (
                <>
                    {isEditable ? (
                        <>
                            <CVField name={`skills.${index}.name`} label="Skill Name"/>
                            <CVField
                                name={`skills.${index}.proficiency`}
                                label="Proficiency"
                                component="input"
                                type="text"
                            />
                        </>
                    ) : (
                        <>
                            <p><strong>Skill Name:</strong> {skills[index]?.name}</p>
                            <p><strong>Proficiency:</strong> {skills[index]?.proficiency}</p>
                        </>
                    )}
                </>
            )}
        </SectionForm>
    );
};

export default SkillsSection;



