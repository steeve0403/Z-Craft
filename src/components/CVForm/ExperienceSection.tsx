// components/ExperienceSection.tsx
import React, { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { CVInputField, CVTextareaField, CVDateField } from './CVFormFields';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { Button } from "../ui/Button";
import { useCVStore } from '../../stores/cvStore';
import {Experience} from "../../types/cv.ts"; // Import du store

// Assurez-vous de recevoir le cvId dans les props
const ExperienceSection: React.FC<{ cvId: string }> = ({ cvId }) => {
    const { control, watch } = useFormContext(); // Utilisation de watch pour surveiller les changements
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'experience', // Nom du champ pour les expériences
    });

    const { updateExperience, addExperience, removeExperience } = useCVStore(); // Actions du store

    // Surveiller les champs d'expérience pour chaque champ
    const watchedExperiences = watch('experience'); // Récupère les valeurs actuelles des expériences

    // Utiliser un useEffect pour mettre à jour l'expérience dans le store à chaque changement
    useEffect(() => {
        if (watchedExperiences) {
            watchedExperiences.forEach((experience: Experience) => {
                if (experience.id) {
                    // Mettre à jour l'expérience dans le store quand les données changent
                    updateExperience(cvId, experience);
                }
            });
        }
    }, [watchedExperiences, cvId, updateExperience]);

    const handleAddExperience = () => {
        const newExperience = { id: Date.now().toString(), company: '', position: '', startDate: '', endDate: '', description: '' };
        append(newExperience); // Ajouter l'expérience dans le formulaire (react-hook-form)
        addExperience(cvId, newExperience); // Ajouter dans le store
    };

    const handleRemoveExperience = (index: number) => {
        const removedExperience = fields[index];
        remove(index); // Supprimer dans le formulaire
        removeExperience(cvId, removedExperience.id); // Supprimer dans le store
    };

    return (
        <div className="cv-form__section">
            <h3>Expériences professionnelles</h3>
            {fields.map((item, index) => (
                <div key={item.id} className="cv-form__item">
                    <CVInputField name={`experience.${index}.company`} label="Entreprise" />
                    <CVInputField name={`experience.${index}.position`} label="Poste" />
                    <div className="cv-form__dates">
                        <CVDateField name={`experience.${index}.startDate`} label="Date de début" />
                        <CVDateField name={`experience.${index}.endDate`} label="Date de fin" />
                    </div>
                    <CVTextareaField name={`experience.${index}.description`} label="Description" />
                    <Button onClick={() => handleRemoveExperience(index)} type="button" variant="outline">
                        <MinusCircle /> Supprimer
                    </Button>
                </div>
            ))}
            <Button onClick={handleAddExperience} type="button">
                <PlusCircle /> Ajouter une expérience
            </Button>
        </div>
    );
};

export default ExperienceSection;



