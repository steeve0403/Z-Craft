// src/components/CVList.tsx
import React from 'react';
import {Link} from 'react-router-dom';
import {useCVStore} from '../stores/cvStore.ts';

const CVList: React.FC = () => {
    const cvs = useCVStore((state) => state.cvs); // Récupère la liste des CVs depuis le store

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
