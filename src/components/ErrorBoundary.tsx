import {Component, ErrorInfo, ReactNode} from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static getDerivedStateFromError(_: Error): State {
        return {hasError: true};
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="bg-white p-8 rounded-lg shadow-md text-center">
                        <h1 className="text-2xl font-bold mb-4">Oops, something went wrong</h1>
                        <p className="mb-4">
                            We're sorry, but an unexpected error occurred. Please try refreshing the page or
                            <a href="/" className="text-blue-500 underline"> go back to the homepage</a>.
                            If the problem persists, feel free to
                            <a href="mailto:support@example.com" className="text-blue-500 underline">contact support</a>.
                        </p>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            onClick={() => window.location.reload()}
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;