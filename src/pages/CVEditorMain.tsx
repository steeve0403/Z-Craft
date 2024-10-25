// CVEditorMain.tsx
import React, {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import CVPreview from '../components/Preview/CVPreview';
import {Button} from '../components/ui/Button';
import { v4 as uuidv4 } from 'uuid';


const CVEditorMain: React.FC = () => {
    const navigate = useNavigate();
    const {id: cvId} = useParams(); // Récupère cvId depuis l'URL

    useEffect(() => {
        if (!cvId) {
            console.warn("Aucun cvId n'a été trouvé dans l'URL.");
        }
    }, [cvId]);

    const handleSelectSection = (section: string) => {
        if (cvId) {
            navigate(`/cv/edit/${cvId}/${section}`);
        } else {
            console.error("Erreur: cvId est undefined.");
        }
    };

    useEffect(() => {
        if (!cvId) {
            const newCvId = uuidv4(); // Génération d'un nouvel id unique pour le CV
            navigate(`/cv/edit/${newCvId}`);
        }
    }, [cvId, navigate]);

    return (
        <div className="cv-editor-main">
            <aside className="cv-preview">
                <CVPreview cvId={cvId}/>
            </aside>
            <div className="cv-sections-overview">
                <h2>{cvId ? 'Modifier le CV' : 'Créer un Nouveau CV'}</h2>
                <div className="sections-grid">
                    <Button onClick={() => handleSelectSection('experience')}>Expérience</Button>
                    <Button onClick={() => handleSelectSection('education')}>Éducation</Button>
                    <Button onClick={() => handleSelectSection('skills')}>Compétences</Button>
                    <Button onClick={() => handleSelectSection('languages')}>Langues</Button>
                </div>
            </div>
        </div>
    );
};

export default CVEditorMain;
