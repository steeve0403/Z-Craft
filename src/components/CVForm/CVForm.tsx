import React, {useEffect, useRef} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {CVInputField} from "./CVFormFields.tsx";
import ExperienceSection from "./ExperienceSection.tsx";
import EducationSection from "./EducationSection.tsx";
import SkillsSection from "./SkillsSection.tsx";
import LanguagesSection from "./LanguagesSection.tsx";
import { CV } from "../../types/cv.ts";
import {Button} from '../ui/Button.tsx';

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
                            minLength: {value: 2, message: 'Minimum 2 characters required'}
                        }}

                    />
                </div>

                <ExperienceSection/>
                <EducationSection/>
                <SkillsSection/>
                <LanguagesSection/>

                <div className="cv-form__actions">
                    <Button type="submit">Save CV</Button>
                </div>
            </form>
        </FormProvider>
    );
};



