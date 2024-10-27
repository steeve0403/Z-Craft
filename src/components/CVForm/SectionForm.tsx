// src/components/CVForm/SectionForm.tsx

import React, {useEffect} from 'react';
import {useFieldArray, useFormContext} from 'react-hook-form';
import {Button} from '../ui/Button';
import {PlusCircle, MinusCircle} from 'lucide-react';

interface SectionFormProps<T> {
    name: string;
    fieldsData: T[];
    addAction: (item: T) => Promise<void>;
    updateAction: (id: string, changes: Partial<T>) => Promise<void>;
    removeAction: (id: string) => Promise<void>;
    newItem: T;
    children: (index: number) => React.ReactNode;
}

function SectionFormComponent<T extends { id: string }>({
                                                            name,
                                                            fieldsData,
                                                            addAction,
                                                            updateAction,
                                                            removeAction,
                                                            newItem,
                                                            children,
                                                        }: SectionFormProps<T>) {
    const {control, watch} = useFormContext();
    const {fields, append, remove, replace} = useFieldArray({control, name});
    const watchedFields = watch(name) as T[];

    // Remplace les champs dans `useFieldArray` quand `fieldsData` change
    useEffect(() => {
        replace(fieldsData);
    }, [fieldsData, replace]);

    // Mise à jour des champs
    useEffect(() => {
        watchedFields?.forEach((field, index) => {
            if (field.id && JSON.stringify(field) !== JSON.stringify(fields[index])) {
                updateAction(field.id, field);
            }
        });
    }, [watchedFields, updateAction, fields]);

    const handleAddItem = () => {
        append(newItem);
        addAction(newItem);
    };

    const handleRemoveItem = (index: number) => {
        const itemId = fields[index].id;
        remove(index);
        removeAction(itemId);
    };

    return (
        <div className={`cv-form__section ${name}`}>
            <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
            {fields.map((item, index) => (
                <div key={item.id} className="cv-form__item">
                    {children(index)}
                    <Button onClick={() => handleRemoveItem(index)} type="button" variant="outline">
                        <MinusCircle/> Supprimer
                    </Button>
                </div>
            ))}
            <Button onClick={handleAddItem} type="button">
                <PlusCircle/> Ajouter un(e) {name}
            </Button>
        </div>
    );
}

export const SectionForm = React.memo(SectionFormComponent) as typeof SectionFormComponent;



