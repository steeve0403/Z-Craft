import {useEffect, useState} from 'react';
import {useCVStore} from '../stores/cvStore';

export const useCVs = () => {
    const cvs = useCVStore((state) => state.cvs);
    const loading = useCVStore((state) => state.loading);
    const error = useCVStore((state) => state.error);
    const fetchCVs = useCVStore((state) => state.fetchCVs);
    const addCV = useCVStore((state) => state.addCV);
    const updateCV = useCVStore((state) => state.updateCV);
    const deleteCV = useCVStore((state) => state.deleteCV);

    const [hasFetched, setHasFetched] = useState(false);

    useEffect(() => {
        if (!hasFetched && !loading && cvs.length === 0) {
            console.log("Calling fetchCVs once..."); // Log pour confirmer l'appel unique
            fetchCVs();
            setHasFetched(true); // Marquer comme déjà récupéré
        }
    }, [cvs.length, fetchCVs, loading, hasFetched]);


    return {
        cvs,
        loading,
        error,
        addCV,
        updateCV,
        deleteCV,
    };
};


