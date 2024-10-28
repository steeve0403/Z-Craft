import React from 'react';
import {CVField} from './CVFormFields';
import {GeneralInfo, Section} from '../../types/cv';
import {SectionForm} from './SectionForm';
import {useGeneralInfos} from "../../hooks/sections/useGeneralInfos.ts";

const GeneralInfoSection: React.FC<Section> = ({cvId, isEditable = true}) => {
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
            fieldsData={[]}
            addAction={addGeneralInfo}
            updateAction={updateGeneralInfo}
            removeAction={deleteGeneralInfo}
            newItem={newGeneralInfo}
            isEditable={isEditable}
        >
            {(index) => (
                <>
                    {isEditable ? (
                        <>
                            <CVField name={`generalInfo.${index}.title`} label="Titre"/>
                            <CVField name={`generalInfo.${index}.firstname`} label="Prénom"/>
                            <CVField name={`generalInfo.${index}.lastname`} label="Nom"/>
                            <CVField name={`generalInfo.${index}.email`} label="Email"/>
                            <CVField name={`generalInfo.${index}.phone`} label="Téléphone"/>
                            <CVField name={`generalInfo.${index}.address`} label="Adresse"/>
                            <CVField name={`generalInfo.${index}.summary`} label="Résumé" component="textarea"/>
                        </>
                    ) : (
                        <>
                            <p><strong>Title:</strong> {generalInfos[index]?.title}</p>
                            <p><strong>Firstname:</strong> {generalInfos[index]?.firstname}</p>
                            <p><strong>Lastname:</strong> {generalInfos[index]?.lastname}</p>
                            <p><strong>Email:</strong> {generalInfos[index]?.email}</p>
                            <p><strong>Phone:</strong> {generalInfos[index]?.phone}</p>
                            <p><strong>Address:</strong> {generalInfos[index]?.address}</p>
                            <p><strong>Summary:</strong> {generalInfos[index]?.summary}</p>
                        </>
                    )}
                </>
            )}
        </SectionForm>
    );
};

export default GeneralInfoSection;

