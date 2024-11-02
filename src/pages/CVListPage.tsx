// z-craft/src/pages/CVListPage.tsx
import React, { useEffect } from 'react';
import CVList from '@components/cv/CVList';
import { useCV } from '@/hooks/useEntityHooks';

const CVListPage: React.FC = () => {
    // Utilisation du hook useCV pour récupérer la liste des CV
    const { items: cvs, loadItems: loadCVs, deleteItem } = useCV();

    useEffect(() => {
        // Charger les CVs au chargement de la page
        loadCVs();
    }, [loadCVs]);

    return (
        <div>
            <h1>CV List</h1>
            <CVList cvs={cvs} onDelete={deleteItem} />
        </div>
    );
};

export default CVListPage;
