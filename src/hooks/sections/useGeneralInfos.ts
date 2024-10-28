import {useEffect, useState} from 'react';
import {useCVStore} from '../../stores/cvStore';

export const useGeneralInfos = (cvId: string) => {
    const generalInfos = useCVStore((state) => state.generalInfos);
    const loading = useCVStore((state) => state.loading);
    const error = useCVStore((state) => state.error);
    const fetchGeneralInfo = useCVStore((state) => state.fetchGeneralInfo);
    const addGeneralInfo = useCVStore((state) => state.addGeneralInfo);
    const updateGeneralInfo = useCVStore((state) => state.updateGeneralInfo);
    const deleteGeneralInfo = useCVStore((state) => state.deleteGeneralInfo);

    const [hasFetched, setHasFetched] = useState(false);

    // Charger les informations générales lors du premier rendu ou lorsque `cvId` change
    useEffect(() => {
        if (!hasFetched && !loading && generalInfos.length === 0) {
            console.log("Calling fetchGeneralInfosByCVId once...");
            fetchGeneralInfo(cvId);
            setHasFetched(true);
        }
    }, [generalInfos.length, fetchGeneralInfo, loading, hasFetched, cvId]);

    return {
        generalInfos,
        loading,
        error,
        addGeneralInfo,
        updateGeneralInfo,
        deleteGeneralInfo,
    };
};
