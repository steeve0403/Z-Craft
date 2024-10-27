import React from 'react';
import {CVField} from './CVFormFields';
import {GeneralInfo} from '../../types/cv';
import {SectionForm} from './SectionForm';
import {useGeneralInfos} from "../../hooks/sections/useGeneralInfos.ts";

const GeneralInfoSection: React.FC<{ cvId: string }> = ({cvId}) => {
    const {
        generalInfos,
        addGeneralInfo,
        updateGeneralInfo,
        deleteGeneralInfo
    } = useGeneralInfos(cvId);

    const newGeneralInfo: GeneralInfo = {
        id: Date.now().toString(),
        cvId,
        title: '',
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        address: '',
        summary: ''
    }

    return (
        <SectionForm<GeneralInfo>
            name="generalInfo"
            fieldsData={generalInfos}
            addAction={addGeneralInfo}
            updateAction={updateGeneralInfo}
            removeAction={deleteGeneralInfo}
            newItem={newGeneralInfo}
        >
            {(index) => (
                <>
                    <CVField name={`generalInfo.${index}.title`} label="Titre"/>
                    <CVField name={`generalInfo.${index}.firstname`} label="Prénom"/>
                    <CVField name={`generalInfo.${index}.lastname`} label="Nom"/>
                    <CVField name={`generalInfo.${index}.email`} label="Email"/>
                    <CVField name={`generalInfo.${index}.phone`} label="Téléphone"/>
                    <CVField name={`generalInfo.${index}.address`} label="Adresse"/>
                    <CVField name={`generalInfo.${index}.summary`} label="Résumé" component="textarea"/>
                </>
            )}
        </SectionForm>
    );
};

export default GeneralInfoSection;

