// components/SkillsSection.tsx
import React, { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { CVInputField } from './CVFormFields';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { useCVStore } from '../../stores/cvStore';
import { Skill } from '../../types/cv';

const SkillsSection: React.FC<{ cvId: string }> = ({ cvId }) => {
    const { control, watch } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'skills', // Nom du champ à surveiller dans le formulaire
    });

    const { updateSkill, addSkill, removeSkill } = useCVStore();

    // Surveiller les changements en temps réel pour chaque champ
    const watchedSkills = watch('skills') as Skill[];

    useEffect(() => {
        if (watchedSkills) {
            watchedSkills.forEach((skill: Skill) => {
                if (skill.name) {
                    updateSkill(cvId, skill);
                }
            });
        }
    }, [watchedSkills, cvId, updateSkill]);

    const handleAddSkill = () => {
        const newSkill: Skill = { name: '', proficiency: 'Beginner' };
        append(newSkill);
        addSkill(cvId, newSkill);
    };

    const handleRemoveSkill = (index: number) => {
        const removedSkill = fields[index];
        remove(index);
        removeSkill(cvId, removedSkill.id);
    };

    return (
        <div className="cv-form__section">
            <h3>Compétences</h3>
            {fields.map((item, index) => (
                <div key={item.id} className="cv-form__item">
                    <CVInputField name={`skills.${index}.name`} label="Compétence" />
                    <CVInputField name={`skills.${index}.level`} label="Niveau" />
                    <Button onClick={() => handleRemoveSkill(index)} type="button" variant="outline">
                        <MinusCircle /> Supprimer
                    </Button>
                </div>
            ))}
            <Button onClick={handleAddSkill} type="button">
                <PlusCircle /> Ajouter une compétence
            </Button>
        </div>
    );
};

export default SkillsSection;
