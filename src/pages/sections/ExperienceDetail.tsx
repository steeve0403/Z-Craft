// src/pages/sections/ExperienceDetail.tsx
import React from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {useNavigate, useParams} from 'react-router-dom';
import ExperienceSection from '../../components/CVForm/ExperienceSection';
import {Button} from '../../components/ui/Button';

const ExperienceDetail: React.FC = () => {
    const methods = useForm();
    const navigate = useNavigate();
    const {id: cvId} = useParams(); // Récupération de cvId

    const handleSave = (data: any) => {
        console.log("Expérience sauvegardée:", data);
        if (cvId) {
            navigate(`/cv/edit/${cvId}`);
        } else {
            console.error("Erreur: cvId est undefined. Impossible de naviguer vers la vue principale.");
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSave)}>
                <div className="section-detail">
                    <h2>Expérience</h2>
                    <ExperienceSection cvId={cvId!}/>
                    <Button type="submit">Enregistrer et Retour</Button>
                </div>
            </form>
        </FormProvider>
    );
};

export default ExperienceDetail;


