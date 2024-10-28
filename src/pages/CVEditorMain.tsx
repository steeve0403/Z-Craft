// src/pages/CVEditorMain.tsx
import React, {useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useForm, FormProvider} from 'react-hook-form';
import {useCVs} from '../hooks/useCVs';
import {CV} from '../types/cv';
import {CVField} from '../components/CVForm/CVFormFields';
import {Button} from '../components/ui/Button';

const CVEditorMain: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {addCV, updateCV, cvs, loading, error} = useCVs();
    const methods = useForm<CV>({defaultValues: cvs.find((cv) => cv.id === id) || {title: ''}});
    const cv = cvs.find((cv) => cv.id === id);

    useEffect(() => {
        if (cv) methods.reset(cv); // Reset form values if CV is found
    }, [cv, methods]);

    const onSubmit = async (data: CV) => {
        try {
            if (cv) {
                await updateCV(cv.id, data);
            } else {
                await addCV(data);
            }
            navigate('/cvs');
        } catch (e) {
            console.error("Error saving CV:", e);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="cv-form">
                <h2>{cv ? 'Edit CV' : 'Create a New CV'}</h2>
                <CVField name="title" label="CV Title"/>
                <Button type="submit">{cv ? 'Update' : 'Save'}</Button>
            </form>
        </FormProvider>
    );
};

export default CVEditorMain;
