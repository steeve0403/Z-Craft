import {useCVStore} from "../../stores/cvStore.ts";

export const useSkills = (cvId: string) => {
    const skills = useCVStore((state) => state.useFetchSkillsByCVId(cvId));
    const loading = useCVStore((state) => state.loading);
    const error = useCVStore((state) => state.error);

    const addSkill = useCVStore((state) => state.addSkill);
    const updateSkill = useCVStore((state) => state.updateSkill);
    const deleteSkill = useCVStore((state) => state.deleteSkill);

    return {
        skills,
        loading,
        error,
        addSkill,
        updateSkill,
        deleteSkill,
    };
};