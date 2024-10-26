import { useCVStore } from '../stores/cvStore';

export const useCVs = () => {
    const cvs = useCVStore((state) => state.cvs);
    const loading = useCVStore((state) => state.loading);
    const error = useCVStore((state) => state.error);

    const fetchCVs = useCVStore((state) => state.useFetchCVs);
    const addCV = useCVStore((state) => state.addCV);
    const updateCV = useCVStore((state) => state.updateCV);
    const deleteCV = useCVStore((state) => state.deleteCV);

    return {
        cvs,
        loading,
        error,
        fetchCVs,
        addCV,
        updateCV,
        deleteCV,
    };
};
