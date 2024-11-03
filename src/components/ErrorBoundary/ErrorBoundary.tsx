import React from 'react';
import ErrorMessage from '../ui/ErrorMessage/ErrorMessage';

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    State
> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Vous pouvez logger l'erreur ici si nécessaire
    }

    render() {
        if (this.state.hasError && this.state.error) {
            return <ErrorMessage message={this.state.error.message} />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
