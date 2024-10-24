// components/LanguagesSection.tsx
import React, { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { CVInputField } from './CVFormFields';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { useCVStore } from '../../stores/cvStore';
import { Language } from '../../types/cv';

const LanguagesSection: React.FC<{ cvId: string }> = ({ cvId }) => {
    const { control, watch } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'languages', // Nom du champ à surveiller dans le formulaire
    });

    const { updateLanguage, addLanguage, removeLanguage } = useCVStore();

    // Surveiller les changements en temps réel pour chaque champ
    const watchedLanguages = watch('languages') as Language[];

    useEffect(() => {
        if (watchedLanguages) {
            watchedLanguages.forEach((language: Language) => {
                if (language.name) {
                    updateLanguage(cvId, language);
                }
            });
        }
    }, [watchedLanguages, cvId, updateLanguage]);

    const handleAddLanguage = () => {
        const newLanguage: Language = { name: '', proficiency: 'Beginner' };
        append(newLanguage);
        addLanguage(cvId, newLanguage);
    };

    const handleRemoveLanguage = (index: number) => {
        const removedLanguage = fields[index];
        remove(index);
        removeLanguage(cvId, removedLanguage.id);
    };

    return (
        <div className="cv-form__section">
            <h3>Langues</h3>
            {fields.map((item, index) => (
                <div key={item.id} className="cv-form__item">
                    <CVInputField name={`languages.${index}.name`} label="Langue" />
                    <CVInputField name={`languages.${index}.level`} label="Niveau" />
                    <Button onClick={() => handleRemoveLanguage(index)} type="button" variant="outline">
                        <MinusCircle /> Supprimer
                    </Button>
                </div>
            ))}
            <Button onClick={handleAddLanguage} type="button">
                <PlusCircle /> Ajouter une langue
            </Button>
        </div>
    );
};

export default LanguagesSection;


