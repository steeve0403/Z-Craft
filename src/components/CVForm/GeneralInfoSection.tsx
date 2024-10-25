// components/GeneralInfoSection.tsx
import React from 'react';
import {CVInputField, CVTextareaField} from './CVFormFields';
import {useCVStore} from '../../stores/cvStore';
import {GeneralInfo} from '../../types/cv';
import {SectionForm} from './SectionForm';

const GeneralInfoSection: React.FC<{ cvId: string }> = ({cvId}) => {
    const {addGeneralInfo, updateGeneralInfo, removeGeneralInfo} = useCVStore();

    // Définition de la structure d'un nouvel élément d'informations générales
    const newGeneralInfo: GeneralInfo = {
        id: Date.now().toString(),
        title: '',
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        address: '',
        summary: '',
    };

    return (
        <SectionForm<GeneralInfo>
            name="generalInfo"
            cvId={cvId}
            fieldsData={[]}  // Données initiales pour cette section
            addAction={addGeneralInfo}
            updateAction={updateGeneralInfo}
            removeAction={removeGeneralInfo}
            newItem={newGeneralInfo}
        >
            {(index) => (
                <>
                    <CVInputField name={`generalInfo.${index}.title`} label="Titre du CV"/>
                    <CVInputField name={`generalInfo.${index}.firstname`} label="Prénom"/>
                    <CVInputField name={`generalInfo.${index}.lastname`} label="Nom"/>
                    <CVInputField name={`generalInfo.${index}.email`} label="Email"/>
                    <CVInputField name={`generalInfo.${index}.phone`} label="Téléphone"/>
                    <CVInputField name={`generalInfo.${index}.address`} label="Adresse"/>
                    <CVTextareaField name={`generalInfo.${index}.summary`} label="Résumé"/>
                </>
            )}
        </SectionForm>
    );
};

export default GeneralInfoSection;
