import React from 'react';
import useDatabaseSeed from '../../hooks/useDatabaseSeed';
import LoadingOverlay from '../ui/LoadingOverlay/LoadingOverlay';
import ErrorMessage from '@components/ui/ErrorMessage/ErrorMessage';

interface Props {
    children: React.ReactNode;
}

const DatabaseInitializer: React.FC<Props> = ({ children }) => {
    const { isSeeding, seedError } = useDatabaseSeed();

    if (isSeeding) {
        return (
            <LoadingOverlay
                isActive={true}
                message='Initialisation de la base de données...'
            />
        );
    }

    if (seedError) {
        return <ErrorMessage message={seedError} />;
    }

    return <>{children}</>;
};

export default DatabaseInitializer;
