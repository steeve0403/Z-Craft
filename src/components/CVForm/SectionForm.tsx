import React, {memo, useEffect} from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '../ui/Button';
import { PlusCircle, MinusCircle } from 'lucide-react';

interface SectionFormProps<T> {
    name: string;
    fieldsData: T[];
    addAction?: (item: T) => Promise<void>;
    updateAction?: (id: string, changes: Partial<T>) => Promise<void>;
    removeAction?: (id: string) => Promise<void>;
    newItem: T;
    isEditable?: boolean; // Nouvelle prop pour contrôler le mode d'édition
    children: (index: number, isEditable: boolean) => React.ReactNode;
}

function SectionFormComponent<T extends { id: string }>({
                                                            name,
                                                            fieldsData,
                                                            addAction,
                                                            updateAction,
                                                            removeAction,
                                                            newItem,
                                                            isEditable = true,
                                                            children,
                                                        }: SectionFormProps<T>) {
    const { control, watch } = useFormContext();
    const { fields, append, remove, replace } = useFieldArray({ control, name });
    const watchedFields = watch(name) as T[];

    // Remplace les champs dans `useFieldArray` quand `fieldsData` change
    useEffect(() => {
        replace(fieldsData);
    }, [fieldsData, replace]);

    // Mise à jour des champs en mode édition
    useEffect(() => {
        if (isEditable && updateAction) {
            watchedFields?.forEach((field, index) => {
                if (field.id && JSON.stringify(field) !== JSON.stringify(fields[index])) {
                    updateAction(field.id, field);
                }
            });
        }
    }, [watchedFields, updateAction, fields, isEditable]);

    const handleAddItem = () => {
        if (isEditable && addAction) {
            append(newItem);
            addAction(newItem);
        }
    };

    const handleRemoveItem = (index: number) => {
        if (isEditable && removeAction) {
            const itemId = fields[index].id;
            remove(index);
            removeAction(itemId);
        }
    };

    return (
        <div className={`cv-form__section ${name}`}>
            <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
            {fields.map((item, index) => (
                <div key={item.id} className="cv-form__item">
                    {children(index, isEditable)}
                    {isEditable && (
                        <Button onClick={() => handleRemoveItem(index)} type="button" variant="outline">
                            <MinusCircle /> Remove
                        </Button>
                    )}
                </div>
            ))}
            {isEditable && (
                <Button onClick={handleAddItem} type="button">
                    <PlusCircle /> Add {name.charAt(0).toUpperCase() + name.slice(1)}
                </Button>
            )}
        </div>
    );
}

export const SectionForm = memo(SectionFormComponent) as typeof SectionFormComponent;



