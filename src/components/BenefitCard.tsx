import React from 'react';

interface BenefitCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

/**
 * BenefitCard component used to display a feature or benefit of the CV Manager.
 * @param {React.ReactNode} icon - Icon representing the benefit.
 * @param {string} title - Title of the benefit.
 * @param {string} description - Description of the benefit.
 */
export const BenefitCard: React.FC<BenefitCardProps> = ({icon, title, description}: BenefitCardProps) => (
    <div className="home__benefit-card">
        <div className="icon-container">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
);