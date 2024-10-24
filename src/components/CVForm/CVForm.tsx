import React, {useEffect, useRef} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {CVInputField} from './CVFormFields';
import ExperienceSection from './ExperienceSection';
import EducationSection from './EducationSection';
import SkillsSection from './SkillsSection';
import LanguagesSection from './LanguagesSection';
import {CV} from '../../types/cv';
import {Button} from '../ui/Button';

export interface CVFormProps {
    initialData?: CV;
    onSubmit: (data: CV) => void;
    onChange: (data: Partial<CV>) => void;
}

export const CVForm: React.FC<CVFormProps> = ({initialData, onSubmit, onChange}) => {
    const methods = useForm<CV>({
        defaultValues: initialData,
    });

    const watchedFields = methods.watch();
    const prevWatchedFields = useRef<Partial<CV> | undefined>(watchedFields); // Mémorise les champs observés précédents

    useEffect(() => {
        // Ne déclenche onChange que si les champs ont réellement changé
        if (JSON.stringify(prevWatchedFields.current) !== JSON.stringify(watchedFields)) {
            onChange(watchedFields);
            prevWatchedFields.current = watchedFields; // Met à jour les champs précédents après appel
        }
    }, [watchedFields, onChange]);

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="cv-form">
                {/* Informations générales */}
                <div className="cv-form__section">
                    <CVInputField
                        name="title"
                        label="CV Title"
                        rules={{required: 'CV Title is required'}}
                    />
                    <CVInputField
                        name="fullName"
                        label="Full Name"
                        rules={{
                            required: 'Full name is required',
                            minLength: {value: 2, message: 'Minimum 2 characters required'},
                        }}
                    />
                </div>

                {/* Passer cvId à la section Experience */}
                <ExperienceSection cvId={initialData?.id || ''}/>
                <EducationSection cvId={initialData?.id || ''}/>
                <SkillsSection cvId={initialData?.id || ''}/>
                <LanguagesSection cvId={initialData?.id || ''}/>

                <div className="cv-form__actions">
                    <Button type="submit">Save CV</Button>
                </div>
            </form>
        </FormProvider>
    );
};


