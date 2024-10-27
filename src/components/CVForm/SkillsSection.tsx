import React from 'react';
import {CVField} from './CVFormFields';
import {Skill} from '../../types/cv';
import {SectionForm} from './SectionForm';
import {useSkills} from "../../hooks/sections/useSkills.ts";

const SkillsSection: React.FC<{ cvId: string }> = ({cvId}) => {
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
        >
            {(index) => (
                <>
                    <CVField name={`skills.${index}.name`} label="Skill Name"/>
                    <CVField
                        name={`skills.${index}.proficiency`}
                        label="Proficiency"
                        component="input"
                        type="text"
                    />
                </>
            )}
        </SectionForm>
    );
};

export default SkillsSection;



