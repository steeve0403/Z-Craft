import {useEffect} from 'react';
import {useCVStore} from '../stores/cvStore';

export const useCVs = () => {
    const {cvs, loading, error, fetchCVs, addCV, updateCV, deleteCV} = useCVStore((state) => ({
        cvs: state.cvs,
        loading: state.loading,
        error: state.error,
        fetchCVs: state.fetchCVs,
        addCV: state.addCV,
        updateCV: state.updateCV,
        deleteCV: state.deleteCV,
    }));

    useEffect(() => {
        fetchCVs();
    }, [fetchCVs]);

    return {
        cvs,
        loading,
        error,
        addCV,
        updateCV,
        deleteCV,
    };
};

