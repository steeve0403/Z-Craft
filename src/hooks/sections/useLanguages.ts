import {useCVStore} from "../../stores/cvStore.ts";

export const useLanguages = (cvId: string) => {
    const languages = useCVStore((state) => state.useFetchLanguagesByCVId(cvId));
    const loading = useCVStore((state) => state.loading);
    const error = useCVStore((state) => state.error);

    const addLanguage = useCVStore((state) => state.addLanguage);
    const updateLanguage = useCVStore((state) => state.updateLanguage);
    const deleteLanguage = useCVStore((state) => state.deleteLanguage);

    return {
        languages,
        loading,
        error,
        addLanguage,
        updateLanguage,
        deleteLanguage,
    };
};
