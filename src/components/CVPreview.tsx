import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCVs } from '../hooks/useCVs';

const CVPreview: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { cvs, loading, error } = useCVs();
    const cv = cvs.find((cv) => cv.id === id);

    if (loading) return <p>Chargement du CV...</p>;
    if (error) return <p>Erreur : {error}</p>;
    if (!cv) return <p>CV non trouvé</p>;

    return (
        <div className="cv-preview">
            <h2>{cv.title || 'CV sans titre'}</h2>
            <Link to={`/cv/edit/${cv.id}`}>
                <button>Modifier ce CV</button>
            </Link>
        </div>
    );
};

export default CVPreview;



