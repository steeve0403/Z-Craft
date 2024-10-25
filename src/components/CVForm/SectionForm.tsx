// components/SectionForm.tsx
import React, {useEffect, ReactNode, useCallback} from 'react';
import {useFieldArray, useFormContext} from 'react-hook-form';
import {Button} from '../ui/Button';
import {PlusCircle, MinusCircle} from 'lucide-react';

interface SectionFormProps<T> {
    name: string;
    cvId: string;
    fieldsData: T[];
    addAction: (cvId: string, item: T) => void;
    updateAction: (cvId: string, item: T) => void;
    removeAction: (cvId: string, itemId: string) => void;
    children: (item: T, index: number) => ReactNode;
    newItem: T;
}

export function SectionForm<T extends { id: string }>({
                                                          name,
                                                          cvId,
                                                          addAction,
                                                          updateAction,
                                                          removeAction,
                                                          children,
                                                          newItem,
                                                      }: SectionFormProps<T>) {
    const {control, watch} = useFormContext();
    const {fields, append, remove} = useFieldArray({control, name});

    const watchedItems = watch(name) as T[];

    useEffect(() => {
        if (watchedItems) {
            watchedItems.forEach((item) => {
                if (item.id) updateAction(cvId, item);
            });
        }
    }, [watchedItems, cvId, updateAction]);

    const handleAdd = useCallback(() => {
        append(newItem);
        addAction(cvId, newItem);
    }, [append, addAction, cvId, newItem]);

    const handleRemove = useCallback((index: number) => {
        const removedItem = fields[index];
        remove(index);
        removeAction(cvId, removedItem.id);
    }, [fields, remove, removeAction, cvId]);

    return (
        <div className="cv-form__section">
            {fields.map((item, index) => (
                <div key={item.id} className="cv-form__item">
                    {children(item, index)}
                    <Button onClick={() => handleRemove(index)} type="button" variant="outline">
                        <MinusCircle/> Supprimer
                    </Button>
                </div>
            ))}
            <Button onClick={handleAdd} type="button">
                <PlusCircle/> Ajouter
            </Button>
        </div>
    );
}
