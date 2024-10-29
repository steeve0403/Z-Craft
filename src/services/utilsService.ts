/**
 * A utility function to handle errors in async Dexie service calls.
 * Logs the error and throws a custom error message.
 * @template T - The return type of the async operation
 * @param {() => Promise<T>} operation - The async operation to perform.
 * @param {string} errorMessage - The custom error message to throw if the operation fails.
 * @returns {Promise<T>} - The result of the async operation if successful
 */
export async function handleServiceError<T>(
    operation: () => Promise<T>,
    errorMessage: string
): Promise<T> {
    try {
        return await operation();
    } catch (error) {
        console.error(errorMessage, error);
        throw new Error(errorMessage);
    }
}

/**
 * Handles known error types and provides user-friendly messages.
 * @param {unknown} error - The error to handle
 * @returns {string} - A user-friendly error message
 */
export function handleKnownError(error: unknown): string {
    if (error instanceof TypeError) return 'Network error. Check your connection.';
    if (error instanceof RangeError) return 'Data format error. Please retry.';
    return error instanceof Error ? error.message : 'Unknown error';
}
