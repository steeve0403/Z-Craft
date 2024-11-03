import React from 'react';
import LoadingSpinner from '../LoadingSpinner';

/**
 * LoadingOverlay Component
 * Displays a full-screen overlay with a spinner and optional message.
 *
 * @component
 * @param {string} message - Optional message to display under the spinner.
 * @param {boolean} isActive - Determines if the overlay should be displayed.
 * @example
 * <LoadingOverlay isActive={isLoading} message="Loading application..." />
 */
interface LoadingOverlayProps {
    message?: string;
    isActive: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
    message,
    isActive,
}) => {
    if (!isActive) return null;

    return (
        <div className='loading-overlay'>
            <LoadingSpinner message={message} size='large' isCentered />
        </div>
    );
};

export default LoadingOverlay;
