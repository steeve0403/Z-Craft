import {useCVStore} from "../../stores/cvStore.ts";

export const useEducations = (cvId: string) => {
    const educations = useCVStore((state) => state.useFetchEducationsByCVId(cvId));
    const loading = useCVStore((state) => state.loading);
    const error = useCVStore((state) => state.error);

    const addEducation = useCVStore((state) => state.addEducation);
    const updateEducation = useCVStore((state) => state.updateEducation);
    const deleteEducation = useCVStore((state) => state.deleteEducation);

    return {
        educations,
        loading,
        error,
        addEducation,
        updateEducation,
        deleteEducation,
    };
};