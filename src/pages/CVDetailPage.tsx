import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    useCV,
    useExperience,
    useEducation,
    useGeneralInfo,
    useSkill,
    useLanguage,
} from '@/hooks/useEntityHooks';
import CVDetail from '@components/CVDetail';

const CVDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const { items: cvs, loadItems: loadCVs } = useCV();
    const { items: experiences, loadItems: loadExperiences } = useExperience();
    const { items: educations, loadItems: loadEducations } = useEducation();
    const { items: generalInfos, loadItems: loadGeneralInfos } =
        useGeneralInfo();
    const { items: skills, loadItems: loadSkills } = useSkill();
    const { items: languages, loadItems: loadLanguages } = useLanguage();

    useEffect(() => {
        loadCVs();
        loadExperiences();
        loadEducations();
        loadGeneralInfos();
        loadSkills();
        loadLanguages();
    }, [
        loadCVs,
        loadExperiences,
        loadEducations,
        loadGeneralInfos,
        loadSkills,
        loadLanguages,
    ]);

    const cv = cvs.find((cv) => cv.id === id);
    if (!cv) {
        return <p>CV not found</p>;
    }

    return (
        <CVDetail
            cv={cv}
            generalInfos={generalInfos.filter((info) => info.cvId === id)}
            experiences={experiences.filter((exp) => exp.cvId === id)}
            educations={educations.filter((edu) => edu.cvId === id)}
            skills={skills.filter((skill) => skill.cvId === id)}
            languages={languages.filter((lang) => lang.cvId === id)}
        />
    );
};

export default CVDetailPage;
