import React from 'react';
import {useParams, Link} from 'react-router-dom';
import {useExperiences} from '../../hooks/sections/useExperiences';

const ExperienceList: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const {experiences, loading, error} = useExperiences(id || '');

    if (loading) return <p>Loading experiences...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="experience-list">
            <h2>Experiences for CV {id}</h2>
            {experiences.length > 0 ? (
                <ul>
                    {experiences.map((exp) => (
                        <li key={exp.id}>
                            <Link to={`/cv/preview/${id}/experience/${exp.id}`}>
                                {exp.position} at {exp.company}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No experiences available.</p>
            )}
        </div>
    );
};

export default ExperienceList;
