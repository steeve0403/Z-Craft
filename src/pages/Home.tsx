import React from 'react';
import { BenefitsSection } from '@components/home/BenefitsSection';
import { HeroSection } from '@components/home/HeroSection';
import { ActionsSection } from '@components/home/ActionsSection';

/**
 * Home component displaying the main features and navigation options.
 * @returns {React.ReactElement} The Home component with actions and benefits sections.
 */
const Home: React.FC = (): React.ReactElement => {
    return (
        <div className='home'>
            <HeroSection />
            <ActionsSection />
            <BenefitsSection />
        </div>
    );
};

export default Home;
