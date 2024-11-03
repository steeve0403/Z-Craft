import React from 'react';
import { CV } from '../types/cv';
import { Link } from 'react-router-dom';

interface CVItemProps {
    cv: CV;
    onDelete: (id: string) => void;
}

const CVItem: React.FC<CVItemProps> = ({ cv, onDelete }) => (
    <li>
        <Link to={`/cv/${cv.id}`}>
            {cv.title} - Created at:{' '}
            {new Date(cv.createdAt).toLocaleDateString()}
        </Link>
        <button onClick={() => onDelete(cv.id)}>Delete</button>
    </li>
);

export default CVItem;
