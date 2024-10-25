// src/pages/CVPreview.tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {useCVStore} from "../../stores/cvStore.ts";
import { Button } from '../ui/Button.tsx';

const CVPreview: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const cv = useCVStore((state) => state.getCVById(id || ""));

    if (!cv) {
        return <p>CV non trouvé.</p>;
    }

    return (
        <div className="cv-preview">
            <h2>{cv.title || "CV sans titre"}</h2>
            <p><strong>Nom complet :</strong> {cv.fullName}</p>
            <p><strong>Résumé :</strong> {cv.summary}</p>
            {/* Ajout de l'affichage des autres sections (expérience, éducation, etc.) ici */}

            <Link to={`/cv/edit/${cv.id}`}>
                <Button>Modifier ce CV</Button>
            </Link>
        </div>
    );
};

export default CVPreview;
