import { create } from 'zustand';
import { Draft, produce } from 'immer';

interface ErrorInfo {
    message: string;
    details?: string;
}

export interface GenericStoreState<T> {
    items: T[];
    isLoading: boolean;
    isError: boolean;
    errorInfo: ErrorInfo | null;

    loadItems: () => Promise<void>;
    addItem: (item: T) => Promise<OperationResult>;
    updateItem: (item: T) => Promise<OperationResult>;
    deleteItem: (id: string) => Promise<OperationResult>;
}

export interface OperationResult {
    success: boolean;
    errorInfo?: ErrorInfo;
}

/**
 * Function to create a Zustand store for a given service and entity type.
 * @param service - The service providing CRUD operations (e.g., cvService, experienceService)
 * @returns Zustand store for managing the state of the entity.
 */
export const createGenericStore = <T extends { id: string }>(service: {
    getAll: () => Promise<T[]>;
    add: (item: T) => Promise<void>;
    upsert: (item: T) => Promise<void>;
    delete: (id: string) => Promise<void>;
}) => {
    return create<GenericStoreState<T>>((set, get) => ({
        items: [],
        isLoading: false,
        isError: false,
        errorInfo: null,

        loadItems: async () => {
            set(() => ({ isLoading: true, isError: false, errorInfo: null }));
            try {
                const items = await service.getAll();
                set(() => ({ items, isLoading: false }));
            } catch (error) {
                console.error("Failed to load items:", error);
                set(() => ({ isLoading: false, isError: true, errorInfo: { message: "Failed to load items", details: String(error) } }));
            }
        },

        addItem: async (item: T): Promise<OperationResult> => {
            if (!item.id) {
                return { success: false, errorInfo: { message: "Invalid item: missing ID" } };
            }
            try {
                await service.add(item);
                set((state) => produce(state, (draft: Draft<GenericStoreState<T>>) => {
                    draft.items.push(item as Draft<T>);
                }));
                return { success: true };
            } catch (error) {
                console.error("Failed to add item:", error);
                return { success: false, errorInfo: { message: "Failed to add item", details: String(error) } };
            }
        },

        updateItem: async (item: T): Promise<OperationResult> => {
            if (!item.id) {
                return { success: false, errorInfo: { message: "Invalid item: missing ID" } };
            }
            try {
                await service.upsert(item);
                set((state) => produce(state, (draft: Draft<GenericStoreState<T>>) => {
                    const index = draft.items.findIndex((existingItem) => existingItem.id === item.id);
                    if (index !== -1) {
                        draft.items[index] = item as Draft<T>;
                    }
                }));
                return { success: true };
            } catch (error) {
                console.error("Failed to update item:", error);
                return { success: false, errorInfo: { message: "Failed to update item", details: String(error) } };
            }
        },

        deleteItem: async (id: string): Promise<OperationResult> => {
            const previousItems = [...get().items]; // Save current state for rollback
            set((state) => produce(state, (draft: Draft<GenericStoreState<T>>) => {
                draft.items = draft.items.filter((item) => item.id !== id);
            }));

            try {
                await service.delete(id);
                return { success: true };
            } catch (error) {
                console.error("Failed to delete item:", error);
                // Rollback in case of failure
                set(() => ({ items: previousItems }));
                return { success: false, errorInfo: { message: "Failed to delete item", details: String(error) } };
            }
        },
    }));
};



