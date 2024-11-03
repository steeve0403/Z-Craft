import { useEffect, useState } from 'react';
import { seedDatabase } from '@/db/dbSeed';

/**
 * Custom hook to seed the database on application mount.
 * It handles loading, error state, and ensures proper management of the async function.
 */
const useDatabaseSeed = () => {
    const [isSeeding, setIsSeeding] = useState<boolean>(false);
    const [seedError, setSeedError] = useState<string | null>(null);

    useEffect(() => {
        const seed = async () => {
            try {
                setIsSeeding(true);
                await seedDatabase();
                console.log('Database seeding completed successfully.');
            } catch (error: any) {
                console.error('Database seeding failed:', error);
                setSeedError(
                    error.message ||
                        'An error occurred while seeding the database'
                );
            } finally {
                setIsSeeding(false);
            }
        };

        seed().then((r) => r);
    }, []);

    return { isSeeding, seedError };
};

export default useDatabaseSeed;
