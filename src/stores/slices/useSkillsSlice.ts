// stores/slices/useSkillSlice.ts
import {CV, Skill} from '../../types/cv'; // Import du type Skill
import { StateCreator } from 'zustand'; // Import de StateCreator de Zustand

// Interface pour la gestion des compétences dans le store
export interface SkillStore {
    cvs: CV[]; // Tableau de CVs
    addSkill: (cvId: string, skill: Skill) => void;
    updateSkill: (cvId: string, skill: Skill) => void;
    removeSkill: (cvId: string, skillName: string) => void;
}

// Slice pour gérer les compétences dans un CV
export const createSkillSlice: StateCreator<SkillStore> = (set, get, store) => ({
    cvs: [],
    // Ajouter une compétence dans un CV spécifique
    addSkill: (cvId, skill) => {
        // Accès à l'état global via get(), puis modification de cvs
        const cvs = get().cvs; // Récupère l'état global
        set({
            cvs: cvs.map((cv) =>
                cv.id === cvId ? { ...cv, skills: [...cv.skills, skill] } : cv
            ),
        });
    },

    // Mettre à jour une compétence existante dans un CV
    updateSkill: (cvId, skill) => {
        const cvs = get().cvs; // Récupère l'état global
        set({
            cvs: cvs.map((cv) =>
                cv.id === cvId
                    ? {
                        ...cv,
                        skills: cv.skills.map((s) =>
                            s.name === skill.name ? skill : s
                        ),
                    }
                    : cv
            ),
        });
    },

    // Supprimer une compétence d'un CV
    removeSkill: (cvId, skillName) => {
        const cvs = get().cvs; // Récupère l'état global
        set({
            cvs: cvs.map((cv) =>
                cv.id === cvId
                    ? {
                        ...cv,
                        skills: cv.skills.filter((s) => s.name !== skillName),
                    }
                    : cv
            ),
        });
    },
});

