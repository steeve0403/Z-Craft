import React from 'react';

/**
 * LoadingSpinner Component
 * Displays a spinning loader with optional messages.
 * Can be used within an overlay or standalone.
 *
 * @component
 * @param {string} message - Optional message to display under the spinner.
 * @param {'small' | 'medium' | 'large'} size - The size of the spinner.
 * @param {boolean} [isCentered=false] - Whether the spinner should be absolutely centered in its container.
 * @example
 * <LoadingSpinner message="Loading data..." size="large" />
 */
interface LoadingSpinnerProps {
    message?: string;
    size?: 'small' | 'medium' | 'large';
    isCentered?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    message,
    size = 'medium',
    isCentered = false,
}) => {
    return (
        <div
            className={`loading-spinner ${isCentered ? 'loading-spinner--centered' : ''}`}
        >
            <div
                className={`spinner spinner--${size}`}
                role='status'
                aria-live='polite'
                aria-busy='true'
            ></div>
            {message && <p className='loading-spinner__message'>{message}</p>}
        </div>
    );
};

export default LoadingSpinner;
