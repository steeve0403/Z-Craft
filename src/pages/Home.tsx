import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import {FileText, List, PlusCircle} from 'lucide-react';

const Home: React.FC = () => {
    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Welcome to CV Manager</h1>
            <p className="text-xl mb-8">Create, manage, and download professional CVs with ease.</p>
            <div className="space-y-4">
                <Button as={Link} to="/cv/new" size="lg" className="w-full sm:w-auto">
                    <PlusCircle className="w-5 h-5 mr-2" /> Create New CV
                </Button>
                <Button as={Link} to="/cvs" variant="outline" size="lg" className="w-full sm:w-auto">
                    <List className="w-5 h-5 mr-2" /> View My CVs
                </Button>
            </div>
            <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-4">Why use CV Manager?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <FileText className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                        <h3 className="text-xl font-semibold mb-2">Professional Templates</h3>
                        <p>Choose from a variety of professionally designed CV templates.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <List className="w-12 h-12 mx-auto mb-4 text-green-500" />
                        <h3 className="text-xl font-semibold mb-2">Easy Management</h3>
                        <p>Organize and update your CVs effortlessly in one place.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        {/*<Download className="w-12 h-12 mx-auto mb-4 text-purple-500" />*/}
                        <h3 className="text-xl font-semibold mb-2">Instant Download</h3>
                        <p>Download your CV in various formats with just one click.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
