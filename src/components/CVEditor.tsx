import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { useCVs } from '../hooks/useCVs';
import { CV } from '../types/cv';
import { CVField } from './CVForm/CVFormFields';
import { Button } from './ui/Button';

const CVEditor: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addCV, updateCV, cvs, loading, error } = useCVs();
    const methods = useForm<CV>({ defaultValues: cvs.find((cv) => cv.id === id) || { title: '' } });
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
            navigate('/');
        } catch (e) {
            console.error("Erreur lors de l'enregistrement du CV :", e);
        }
    };

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="cv-form">
                <h2>{cv ? 'Modifier le CV' : 'Créer un nouveau CV'}</h2>
                <CVField name="title" label="Titre du CV" />
                <Button type="submit">{cv ? 'Mettre à jour' : 'Enregistrer'}</Button>
            </form>
        </FormProvider>
    );
};

export default CVEditor;
