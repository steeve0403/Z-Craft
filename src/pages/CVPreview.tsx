// src/pages/CVPreview.tsx
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCVs } from '../hooks/useCVs';
import { useGeneralInfos } from '../hooks/sections/useGeneralInfos';
import { useExperiences } from '../hooks/sections/useExperiences';
import { useEducations } from '../hooks/sections/useEducations';
import { useSkills } from '../hooks/sections/useSkills';
import { useLanguages } from '../hooks/sections/useLanguages';
import { Button } from '../components/ui/Button';
import { CVForm } from '../components/CVForm/CVForm';

const CVPreview: React.FC = () => {
    const { id: cvId } = useParams<{ id: string }>();

    // Charger le CV et ses sections
    const { cvs, loading: loadingCVs, error: errorCVs } = useCVs();
    const { generalInfos, loading: loadingGeneralInfos, error: errorGeneralInfos } = useGeneralInfos(cvId || '');
    const { experiences, loading: loadingExperiences, error: errorExperiences } = useExperiences(cvId || '');
    const { educations, loading: loadingEducations, error: errorEducations } = useEducations(cvId || '');
    const { skills, loading: loadingSkills, error: errorSkills } = useSkills(cvId || '');
    const { languages, loading: loadingLanguages, error: errorLanguages } = useLanguages(cvId || '');

    // Rechercher le CV spécifique à partir de l'ID
    const cv = cvs.find((cv) => cv.id === cvId);

    // État de chargement ou erreur pour chaque section
    const loading = loadingCVs || loadingGeneralInfos || loadingExperiences || loadingEducations || loadingSkills || loadingLanguages;
    const error = errorCVs || errorGeneralInfos || errorExperiences || errorEducations || errorSkills || errorLanguages;

    if (loading) return <p>Loading CV...</p>;
    if (error) return <p>Error loading CV data: {error}</p>;
    if (!cv) return <p>CV not found</p>;

    return (
        <div className="cv-preview">
            {/* Utilisation de CVForm en mode visualisation */}
            <CVForm
                initialData={{
                    ...cv,
                    generalInfos,
                    experiences,
                    educations,
                    skills,
                    languages
                }}
                isEditable={false}
            />
            {/* Bouton d'édition du CV */}
            <Link to={`/cv/edit/${cv.id}`}>
                <Button variant="primary">Edit this CV</Button>
            </Link>
        </div>
    );
};

export default CVPreview;

