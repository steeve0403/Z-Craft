import {useEffect} from 'react';
import {useCVStore} from '../../stores/cvStore';

export const useSkills = (cvId: string) => {
    const {skills, loading, error, fetchSkillsByCVId, addSkill, updateSkill, deleteSkill} =
        useCVStore((state) => ({
            skills: state.skills,
            loading: state.loading,
            error: state.error,
            fetchSkillsByCVId: state.fetchSkillsByCVId,
            addSkill: state.addSkill,
            updateSkill: state.updateSkill,
            deleteSkill: state.deleteSkill,
        }));

    // Charger les compétences lors du premier rendu ou lors d'un changement de cvId
    useEffect(() => {
        fetchSkillsByCVId(cvId);
    }, [fetchSkillsByCVId, cvId]);

    return {
        skills,
        loading,
        error,
        addSkill,
        updateSkill,
        deleteSkill,
    };
};
