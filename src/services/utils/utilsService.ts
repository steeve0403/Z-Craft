// src/services/utils/serviceUtils.ts

/**
 * A utility function to handle errors in async Dexie service calls.
 * Logs the error and throws a custom error message.
 * @param operation - The async operation to perform.
 * @param errorMessage - The custom error message to throw if the operation fails.
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
