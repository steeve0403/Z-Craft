import {useEffect} from 'react';
import {useCVStore} from '../../stores/cvStore';

export const useEducations = (cvId: string) => {
    const {educations, loading, error, fetchEducationsByCVId, addEducation, updateEducation, deleteEducation} =
        useCVStore((state) => ({
            educations: state.educations,
            loading: state.loading,
            error: state.error,
            fetchEducationsByCVId: state.fetchEducationsByCVId,
            addEducation: state.addEducation,
            updateEducation: state.updateEducation,
            deleteEducation: state.deleteEducation,
        }));

    useEffect(() => {
        fetchEducationsByCVId(cvId);
    }, [fetchEducationsByCVId, cvId]);

    return {
        educations,
        loading,
        error,
        addEducation,
        updateEducation,
        deleteEducation,
    };
};
