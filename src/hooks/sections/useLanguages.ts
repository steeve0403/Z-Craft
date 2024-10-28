import {useEffect} from 'react';
import {useCVStore} from '../../stores/cvStore';

export const useLanguages = (cvId: string) => {
    const {languages, loading, error, fetchLanguagesByCVId, addLanguage, updateLanguage, deleteLanguage} =
        useCVStore((state) => ({
            languages: state.languages,
            loading: state.loading,
            error: state.error,
            fetchLanguagesByCVId: state.fetchLanguages,
            addLanguage: state.addLanguage,
            updateLanguage: state.updateLanguage,
            deleteLanguage: state.deleteLanguage,
        }));

    // Charger les langues lors du premier rendu ou lors d'un changement de cvId
    useEffect(() => {
        fetchLanguagesByCVId(cvId);
    }, [fetchLanguagesByCVId, cvId]);

    return {
        languages,
        loading,
        error,
        addLanguage,
        updateLanguage,
        deleteLanguage,
    };
};

