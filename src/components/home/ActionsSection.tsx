import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button/Button';
import { PlusCircle, List } from 'lucide-react';

/**
 * Actions section component for the Home page.
 * Displays the main action buttons to create a new CV or view existing ones.
 */
export const ActionsSection: React.FC = () => (
    <div className='home__actions'>
        <Button as={Link} to='/cv/new' size='lg' className='w-full sm:w-auto'>
            <PlusCircle className='w-5 h-5 mr-2' aria-hidden='true' /> Create
            New CV
        </Button>
        <Button
            as={Link}
            to='/cvs'
            variant='outline'
            size='lg'
            className='w-full sm:w-auto'
        >
            <List className='w-5 h-5 mr-2' aria-hidden='true' /> View My CVs
        </Button>
    </div>
);
