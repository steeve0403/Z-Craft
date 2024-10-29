import React from 'react';
import {cn} from '../../utils/cn';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = ({children, className}) => (
    <div className={cn("card", className)}>
        {children}
    </div>
);

Card.displayName = 'Card';

export {Card};
