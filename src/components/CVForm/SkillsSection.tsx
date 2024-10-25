// components/SkillsSection.tsx
import React from 'react';
import {CVInputField} from './CVFormFields';
import {useCVStore} from '../../stores/cvStore';
import {Skill} from '../../types/cv';
import {SectionForm} from './SectionForm';

const SkillsSection: React.FC<{ cvId: string }> = ({cvId}) => {
    const {addSkill, updateSkill, removeSkill} = useCVStore();
    const newSkill: Skill = {id: Date.now().toString(), name: '', proficiency: 'Beginner'};

    return (
        <SectionForm<Skill>
            name="skills"
            cvId={cvId}
            fieldsData={[]}
            addAction={addSkill}
            updateAction={updateSkill}
            removeAction={removeSkill}
            newItem={newSkill}
        >
            {(index) => (
                <>
                    <CVInputField name={`skills.${index}.name`} label="Compétence"/>
                    <CVInputField name={`skills.${index}.proficiency`} label="Niveau"/>
                </>
            )}
        </SectionForm>
    );
};

export default SkillsSection;

