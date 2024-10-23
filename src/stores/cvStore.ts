import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {CV, Experience, Education, Language} from '../types/cv';

interface CVStore {
    cvs: CV[];
    addCV: (cv: CV) => void;
    updateCV: (id: string, updatedCV: Partial<CV>) => void;
    deleteCV: (id: string) => void;
    getCVById: (id: string) => CV | undefined;

    // Section-specific actions
    addExperience: (cvId: string, experience: Experience) => void;
    updateExperience: (cvId: string, experience: Experience) => void;
    removeExperience: (cvId: string, experienceId: string) => void;

    addEducation: (cvId: string, education: Education) => void;
    updateEducation: (cvId: string, education: Education) => void;
    removeEducation: (cvId: string, educationId: string) => void;

    addLanguage: (cvId: string, language: Language) => void;
    updateLanguage: (cvId: string, language: Language) => void;
    removeLanguage: (cvId: string, languageName: string) => void;
}

export const useCVStore = create<CVStore>()(
    persist(
        (set, get) => ({
            cvs: [],
            addCV: (cv) => set((state) => ({cvs: [...state.cvs, cv]})),
            updateCV: (id, updatedCV) =>
                set((state) => ({
                    cvs: state.cvs.map((cv) => (cv.id === id ? {...cv, ...updatedCV} : cv)),
                })),
            deleteCV: (id) =>
                set((state) => ({cvs: state.cvs.filter((cv) => cv.id !== id)})),
            getCVById: (id) => get().cvs.find((cv) => cv.id === id),

            // Experience section
            addExperience: (cvId, experience) =>
                set((state) => ({
                    cvs: state.cvs.map((cv) =>
                        cv.id === cvId
                            ? {...cv, experience: [...cv.experience, experience]}
                            : cv
                    ),
                })),
            updateExperience: (cvId, experience) =>
                set((state) => ({
                    cvs: state.cvs.map((cv) =>
                        cv.id === cvId
                            ? {
                                ...cv,
                                experience: cv.experience.map((exp) =>
                                    exp.id === experience.id ? experience : exp
                                ),
                            }
                            : cv
                    ),
                })),
            removeExperience: (cvId, experienceId) =>
                set((state) => ({
                    cvs: state.cvs.map((cv) =>
                        cv.id === cvId
                            ? {
                                ...cv,
                                experience: cv.experience.filter((exp) => exp.id !== experienceId),
                            }
                            : cv
                    ),
                })),

            // Education section
            addEducation: (cvId, education) =>
                set((state) => ({
                    cvs: state.cvs.map((cv) =>
                        cv.id === cvId
                            ? {...cv, education: [...cv.education, education]}
                            : cv
                    ),
                })),
            updateEducation: (cvId, education) =>
                set((state) => ({
                    cvs: state.cvs.map((cv) =>
                        cv.id === cvId
                            ? {
                                ...cv,
                                education: cv.education.map((edu) =>
                                    edu.id === education.id ? education : edu
                                ),
                            }
                            : cv
                    ),
                })),
            removeEducation: (cvId, educationId) =>
                set((state) => ({
                    cvs: state.cvs.map((cv) =>
                        cv.id === cvId
                            ? {
                                ...cv,
                                education: cv.education.filter((edu) => edu.id !== educationId),
                            }
                            : cv
                    ),
                })),

            // Language section
            addLanguage: (cvId, language) =>
                set((state) => ({
                    cvs: state.cvs.map((cv) =>
                        cv.id === cvId
                            ? {...cv, languages: [...cv.languages, language]}
                            : cv
                    ),
                })),
            updateLanguage: (cvId, language) =>
                set((state) => ({
                    cvs: state.cvs.map((cv) =>
                        cv.id === cvId
                            ? {
                                ...cv,
                                languages: cv.languages.map((lang) =>
                                    lang.name === language.name ? language : lang
                                ),
                            }
                            : cv
                    ),
                })),
            removeLanguage: (cvId, languageName) =>
                set((state) => ({
                    cvs: state.cvs.map((cv) =>
                        cv.id === cvId
                            ? {
                                ...cv,
                                languages: cv.languages.filter(
                                    (lang) => lang.name !== languageName
                                ),
                            }
                            : cv
                    ),
                })),
        }),
        {
            name: 'cv-storage', // Clé utilisée dans le localStorage
            version: 1, // Version du store
            migrate: (persistedState, version) => {
                // Fonction de migration simple qui vérifie si l'état existe
                if (persistedState) {
                    return Promise.resolve(persistedState); // Pas de migration nécessaire
                }
                return Promise.resolve({cvs: []}); // Retourner un état initial vide si aucune donnée n'est trouvée
            },
        }
    )
);
