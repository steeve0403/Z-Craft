import {useEffect} from 'react';
import {useCVStore} from '../../stores/cvStore';

export const useExperiences = (cvId: string) => {
    const {experiences, loading, error, fetchExperiencesByCVId, addExperience, updateExperience, deleteExperience} =
        useCVStore((state) => ({
            experiences: state.experiences,
            loading: state.loading,
            error: state.error,
            fetchExperiencesByCVId: state.fetchExperiences,
            addExperience: state.addExperience,
            updateExperience: state.updateExperience,
            deleteExperience: state.deleteExperience,
        }));

    // Charger les expériences lors du premier rendu ou lors d'un changement de cvId
    useEffect(() => {
        fetchExperiencesByCVId(cvId);
    }, [fetchExperiencesByCVId, cvId]);

    return {
        experiences,
        loading,
        error,
        addExperience,
        updateExperience,
        deleteExperience,
    };
};
