import {GenericStoreState} from "../stores/genericStore.ts";

/**
 * Generic hook to interact with a Zustand store for a specific entity type.
 * @param useStore - Zustand store hook for managing entity state
 * @returns An object providing CRUD operations and state selectors for the entity.
 */
export const useGenericEntityStore = <T>(useStore: () => GenericStoreState<T>) => {
    const store = useStore();

    return {
        items: store.items,
        isLoading: store.isLoading,
        isError: store.isError,
        errorInfo: store.errorInfo,
        loadItems: store.loadItems,
        addItem: store.addItem,
        updateItem: store.updateItem,
        deleteItem: store.deleteItem,
    };
};

