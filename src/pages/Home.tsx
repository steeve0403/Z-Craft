import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from '../components/ui/Button';
import {FileText, List, PlusCircle} from 'lucide-react';

// Sous-composant pour les cartes d'avantages
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

const Home: React.FC = () => {
    return (
        <div className="home">
            <h1>Welcome to CV Manager</h1>
            <p>Create, manage, and download professional CVs with ease.</p>

            {/* Actions principales */}
            <div className="home__actions">
                <Button as={Link} to="/cv/new" size="lg" className="w-full sm:w-auto">
                    <PlusCircle className="w-5 h-5 mr-2"/> Create New CV
                </Button>
                <Button as={Link} to="/cvs" variant="outline" size="lg" className="w-full sm:w-auto">
                    <List className="w-5 h-5 mr-2"/> View My CVs
                </Button>
            </div>

            {/* Section des avantages */}
            <div className="home__benefits">
                <h2>Why use CV Manager?</h2>
                <div className="home__benefit-grid">
                    <BenefitCard
                        icon={<FileText className="text-blue-500"/>}
                        title="Professional Templates"
                        description="Choose from a variety of professionally designed CV templates."
                    />
                    <BenefitCard
                        icon={<List className="text-green-500"/>}
                        title="Easy Management"
                        description="Organize and update your CVs effortlessly in one place."
                    />
                    <BenefitCard
                        icon={<div className="text-purple-500">⬇️</div>}
                        title="Instant Download"
                        description="Download your CV in various formats with just one click."
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
