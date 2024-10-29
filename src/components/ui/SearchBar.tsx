import React from 'react';
import {Button} from './Button';
import {Search} from 'lucide-react';

/**
 * SearchBar component for the header to allow quick searches.
 */
const SearchBar: React.FC = () => (
    <div className="header__search">
        <input type="text" className="header__search-input" placeholder="Search..." aria-label="Search through CVs"/>
        <Button className="header__search-button" aria-label="Search">
            <Search className="w-4 h-4"/>
        </Button>
    </div>
);

export default SearchBar;
