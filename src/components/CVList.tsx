// src/components/CVList.tsx
import React from 'react';
import {Link} from 'react-router-dom';
import {useCVs} from '../hooks/useCVs';
import {Button} from './ui/Button';

const CVList: React.FC = () => {
    const {cvs, loading, error, deleteCV} = useCVs();

    const handleDelete = async (id: string) => {
        try {
            await deleteCV(id);
        } catch (e) {
            console.error("Erreur lors de la suppression du CV :", e);
        }
    };

    if (loading) return <p>Chargement des CVs...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (
        <div className="cv-list">
            <h2>Mes CVs</h2>
            {cvs.length > 0 ? (
                <ul className="cv-list__items">
                    {cvs.map((cv) => (
                        <li key={cv.id} className="cv-list__item">
                            <Link to={`/cv/preview/${cv.id}`} className="cv-list__link">
                                {cv.title || 'CV sans titre'}
                            </Link>
                            <Button variant="outline" onClick={() => handleDelete(cv.id)}>
                                Supprimer
                            </Button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aucun CV n’a été créé pour le moment.</p>
            )}
        </div>
    );
};

export default CVList;

