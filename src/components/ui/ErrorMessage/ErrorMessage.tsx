import React from 'react';
import styles from './ErrorMessage.module.scss';

interface Props {
    message: string;
}

const ErrorMessage: React.FC<Props> = ({ message }) => {
    return (
        <div className={styles.error}>
            <p>{message}</p>
        </div>
    );
};

export default ErrorMessage;
