import React from 'react';
import CVList from '../components/list/CVList.tsx';

const CVListPage: React.FC = () => {
    return (
        <div>
            <h1>Manage Your CVs</h1>
            <CVList />
        </div>
    );
};

export default CVListPage;
