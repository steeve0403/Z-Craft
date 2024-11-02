import React from 'react';
import CVItem from './CVItem';
import { CV } from '@/types/cv';

interface CVListProps {
    cvs: CV[];
    onDelete: (id: string) => void;
}

const CVList: React.FC<CVListProps> = ({ cvs, onDelete }) => {
    if (cvs.length === 0) {
        return <p>No CVs available.</p>;
    }

    return (
        <ul>
            {cvs.map((cv) => (
                <CVItem key={cv.id} cv={cv} onDelete={onDelete} />
            ))}
        </ul>
    );
};

export default CVList;
