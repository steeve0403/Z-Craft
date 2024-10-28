// src/pages/sections/ExperienceDetail.tsx
import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useForm, FormProvider} from 'react-hook-form';
import {useExperiences} from '../../hooks/sections/useExperiences';
import {Experience} from '../../types/cv';
import {CVField} from '../../components/CVForm/CVFormFields';
import {Button} from '../../components/ui/Button';

const ExperienceDetail: React.FC = () => {
    const {id, expId} = useParams<{ id: string; expId: string }>();
    const {experiences, updateExperience, loading, error} = useExperiences(id || '');
    const methods = useForm<Experience>();
    const experience = experiences.find((exp) => exp.id === expId);

    useEffect(() => {
        if (experience) methods.reset(experience);
    }, [experience, methods]);

    const onSubmit = async (data: Experience) => {
        if (experience) await updateExperience(expId || '', data);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!experience) return <p>Experience not found</p>;

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="experience-detail-form">
                <h2>Edit Experience</h2>
                <CVField name="position" label="Position"/>
                <CVField name="company" label="Company"/>
                <CVField name="startDate" label="Start Date" type="date"/>
                <CVField name="endDate" label="End Date" type="date"/>
                <CVField name="description" label="Description" component="textarea"/>
                <Button type="submit">Update Experience</Button>
            </form>
        </FormProvider>
    );
};

export default ExperienceDetail;
