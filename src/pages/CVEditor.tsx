import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {CV} from '../types/cv';
import {v4 as uuidv4} from 'uuid';
import {useCVStore} from "../stores/cvStore";
import {CVForm} from '../components/CVForm/CVForm';

import {useAutoSave} from '../hooks/useAutoSave';
import LoadingSpinner from '../components/LoadingSpinner';

const CVEditor: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {getCVById, addCV, updateCV} = useCVStore();

    const [cv, setCv] = useState<CV | undefined>(id ? getCVById(id) : undefined);
    const [isLoading, setIsLoading] = useState(true); // Nouvel état pour le chargement
    const [isSaving, setIsSaving] = useState(false); // Nouvel état pour indiquer si la sauvegarde est en cours
    const [error, setError] = useState<string | null>(null); // Nouvel état pour gérer les erreurs

    useEffect(() => {
        if (id) {
            const savedCV = localStorage.getItem(`cv_${id}`);
            if (savedCV) {
                setCv(JSON.parse(savedCV)); // Charger les données du localStorage
            } else {
                const cvFromStore = getCVById(id); // Charger depuis le store si dispo
                setCv(cvFromStore);
            }
        }
        setIsLoading(false);
    }, [getCVById, id]);

    useEffect(() => {
        if (cv && id) {
            localStorage.setItem(`cv_${id}`, JSON.stringify(cv)); // Sauvegarde auto dans localStorage
        }
    }, [cv, id]);

    useAutoSave(cv, id, 2000);

    const handleSubmit = async (data: CV) => {
        setIsSaving(true);
        setError(null);
        try {
            if (id) {
                updateCV(id, {...data, updatedAt: new Date().toISOString()});
            } else {
                const newCV = {
                    ...data,
                    id: uuidv4(),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                };
                addCV(newCV);
                navigate(`/cv/edit/${newCV.id}`);
            }
        } catch (e) {
            setError('An error occurred while saving the CV. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleChange = (data: Partial<CV>) => {
        setCv(prevCV => ({...prevCV, ...data} as CV));
    };

    if (isLoading) {
        return <LoadingSpinner/>
    }

    // useEffect(() => {
    //     console.log('CV ID from params:', id);
    // }, [id]);

    return (
        <div className="cv-editor">
            <h1>{id ? 'Edit CV' : 'Create New CV'}</h1>
            {error &&
                <div className="error-message">
                    {error}
                </div>}

            <CVForm initialData={cv} onSubmit={handleSubmit} onChange={handleChange}/>
            {isSaving && <div className="loading-spinner"><LoadingSpinner/></div>}
        </div>
    );
};
export default CVEditor;