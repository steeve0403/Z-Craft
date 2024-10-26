import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CV } from '../types/cv';
import cvService from "../services/dexie/cvService.ts";

const CVList: React.FC = () => {
    const [cvs, setCvs] = useState<CV[]>([]);
    const [loading, setLoading] = useState(true);

    // Fonction pour récupérer les CVs depuis la base de données
    const fetchCVs = async () => {
        setLoading(true);
        try {
            const cvData = await cvService.getAllCVs();
            setCvs(cvData);
        } catch (error) {
            console.error("Erreur lors du chargement des CVs :", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCVs();
    }, []);

    return (
        <div className="cv-list">
            <h2>Mes CVs</h2>
            {loading ? (
                <p>Chargement des CVs...</p>
            ) : cvs.length > 0 ? (
                <ul className="cv-list__items">
                    {cvs.map((cv) => (
                        <li key={cv.id} className="cv-list__item">
                            <Link to={`/cv/preview/${cv.id}`} className="cv-list__link">
                                {cv.title || 'CV sans titre'}
                            </Link>
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
