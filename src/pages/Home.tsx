// src/pages/Home.tsx
import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from '../components/ui/Button';
import {FileText, List, PlusCircle} from 'lucide-react';

// Benefit card component for displaying features
const BenefitCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({
                                                                                                  icon,
                                                                                                  title,
                                                                                                  description
                                                                                              }) => {
    return (
        <div className="home__benefit-card">
            <div className="icon-container">{icon}</div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

const benefits = [
    {
        icon: <FileText className="text-blue-500"/>,
        title: 'Professional Templates',
        description: 'Choose from a variety of professionally designed CV templates.',
    },
    {
        icon: <List className="text-green-500"/>,
        title: 'Easy Management',
        description: 'Organize and update your CVs effortlessly in one place.',
    },
    {
        icon: <div className="text-purple-500">⬇️</div>,
        title: 'Instant Download',
        description: 'Download your CV in various formats with just one click.',
    },
];

const Home: React.FC = () => {
    return (
        <div className="home">
            <h1>Welcome to CV Manager</h1>
            <p>Create, manage, and download professional CVs with ease.</p>

            {/* Main Actions */}
            <div className="home__actions">
                <Button as={Link} to="/cv/new" size="lg" className="w-full sm:w-auto">
                    <PlusCircle className="w-5 h-5 mr-2"/> Create New CV
                </Button>
                <Button as={Link} to="/cvs" variant="outline" size="lg" className="w-full sm:w-auto">
                    <List className="w-5 h-5 mr-2"/> View My CVs
                </Button>
            </div>

            {/* Benefits Section */}
            <div className="home__benefits">
                <h2>Why use CV Manager?</h2>
                <div className="home__benefit-grid">
                    {benefits.map((benefit, index) => (
                        <BenefitCard
                            key={index}
                            icon={benefit.icon}
                            title={benefit.title}
                            description={benefit.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;

