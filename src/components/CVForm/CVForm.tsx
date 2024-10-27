import React, {useEffect} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {CVField} from './CVFormFields';
import ExperienceSection from './ExperienceSection';
import EducationSection from './EducationSection';
import SkillsSection from './SkillsSection';
import LanguagesSection from './LanguagesSection';
import GeneralInfoSection from './GeneralInfoSection';
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

    useEffect(() => {
        onChange(watchedFields);
    }, [watchedFields, onChange]);

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="cv-form">
                <div className="cv-form__section">
                    <CVField name="title" label="CV Title" rules={{required: 'CV Title is required'}}/>
                </div>
                <GeneralInfoSection cvId={initialData?.id || ''}/>
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






