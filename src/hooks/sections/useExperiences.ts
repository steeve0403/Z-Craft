import {useCVStore} from "../../stores/cvStore.ts";

export const useExperiences = (cvId: string) => {
    const experiences = useCVStore((state) => state.useFetchExperiencesByCVId(cvId));
    const loading = useCVStore((state) => state.loading);
    const error = useCVStore((state) => state.error);

    const addExperience = useCVStore((state) => state.addExperience);
    const updateExperience = useCVStore((state) => state.updateExperience);
    const deleteExperience = useCVStore((state) => state.deleteExperience);

    return {
        experiences,
        loading,
        error,
        addExperience,
        updateExperience,
        deleteExperience,
    };
};