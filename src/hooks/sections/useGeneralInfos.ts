import {useEffect} from 'react';
import {useCVStore} from '../../stores/cvStore';

export const useGeneralInfos = (cvId: string) => {
    const {
        generalInfos,
        loading,
        error,
        fetchGeneralInfosByCVId,
        addGeneralInfo,
        updateGeneralInfo,
        deleteGeneralInfo
    } =
        useCVStore((state) => ({
            generalInfos: state.generalInfos,
            loading: state.loading,
            error: state.error,
            fetchGeneralInfosByCVId: state.fetchGeneralInfosByCVId,
            addGeneralInfo: state.addGeneralInfo,
            updateGeneralInfo: state.updateGeneralInfo,
            deleteGeneralInfo: state.deleteGeneralInfo,
        }));

    // Charger les informations générales lors du premier rendu ou lorsque `cvId` change
    useEffect(() => {
        fetchGeneralInfosByCVId(cvId);
    }, [fetchGeneralInfosByCVId, cvId]);

    return {
        generalInfos,
        loading,
        error,
        addGeneralInfo,
        updateGeneralInfo,
        deleteGeneralInfo,
    };
};
