import React from 'react';
import {CV} from '../../types/cv.ts';

interface CVItemProps {
    cv: CV;
    onDelete: (id: string) => void;
}

const CVItem: React.FC<CVItemProps> = ({cv, onDelete}) => (
    <li>
        {cv.title} - Created at: {new Date(cv.createdAt).toLocaleDateString()}
        <button onClick={() => onDelete(cv.id)}>Delete</button>
    </li>
);

export default CVItem;
