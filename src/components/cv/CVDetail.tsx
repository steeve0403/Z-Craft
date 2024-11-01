import React from 'react';
import {
    CV,
    GeneralInfo,
    Experience,
    Education,
    Skill,
    Language,
} from '@/types/cv';
import SectionList from '../section/SectionList';

interface CVDetailProps {
    cv: CV;
    generalInfos: GeneralInfo[];
    experiences: Experience[];
    educations: Education[];
    skills: Skill[];
    languages: Language[];
}

const CVDetail: React.FC<CVDetailProps> = ({
    cv,
    generalInfos,
    experiences,
    educations,
    skills,
    languages,
}) => {
    return (
        <div>
            <h2>{cv.title}</h2>
            <p>Created at: {new Date(cv.createdAt).toLocaleDateString()}</p>

            <SectionList title='General Info' items={generalInfos} />
            <SectionList title='Experience' items={experiences} />
            <SectionList title='Education' items={educations} />
            <SectionList title='Skills' items={skills} />
            <SectionList title='Languages' items={languages} />
        </div>
    );
};

export default CVDetail;
