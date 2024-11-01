import React from 'react';
import { BenefitCard } from '../common/BenefitCard';
import { benefitsData } from '../../data/benefitsData.tsx';

/**
 * Benefits section component for the Home page.
 * Displays a list of benefits/features offered by the CV Manager.
 */
export const BenefitsSection: React.FC = () => (
    <section className="home__benefits">
        <h2>Why use CV Manager?</h2>
        <div className="home__benefit-grid">
            {benefitsData.map((benefit, index) => (
                <BenefitCard
                    key={index}
                    icon={benefit.icon}
                    title={benefit.title}
                    description={benefit.description}
                />
            ))}
        </div>
    </section>
);