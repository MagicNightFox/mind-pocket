import {useMemo, useState} from "react";
import {InventoryItemContext} from "../../context/InventoryItemContext.jsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {QUERY_KEYS} from "../../Constants.js";
import {createInventoryItem, deleteInventoryItem, listInventoryItems, updateInventoryItem} from "../../calls.js";
const InventoryItemProvider = ({ children }) => {
    const queryClient = useQueryClient();
    const [listDtoIn, setListDtoIn] = useState({});

    // 1. LIST Query (Fetches all/filtered products)
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: [QUERY_KEYS.inventoryItemQueryData, listDtoIn],
        queryFn: () => listInventoryItems(listDtoIn),
    });

    // 2. CREATE Mutation
    const createMutation = useMutation({
        mutationFn: (dtoIn) => createInventoryItem(dtoIn),
        onSuccess: () => {
            // Invalidate and refetch the product list
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.inventoryItemQueryData] });
        },
    });

    // 3. UPDATE Mutation
    const updateMutation = useMutation({
        mutationFn: (dtoIn) => updateInventoryItem(dtoIn),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.inventoryItemQueryData] });
        },
    });

    // 4. DELETE Mutation
    const deleteMutation = useMutation({
        mutationFn: (id) => deleteInventoryItem(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.inventoryItemQueryData] });
        },
    });

    // Memoize the context value to prevent unnecessary re-renders of consumer components
    const value = useMemo(() => ({
        // Data & State
        data,
        isLoading,
        error,
        setListDtoIn,

        // Actions (CRUD)
        list: (dtoIn) => setListDtoIn(dtoIn),
        create: createMutation.mutateAsync,
        update: updateMutation.mutateAsync,
        remove: deleteMutation.mutateAsync,

        // Loading states for individual actions if needed
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
    }), [
        data,
        isLoading,
        error,
        createMutation,
        updateMutation,
        deleteMutation
    ]);

    return (
        <InventoryItemContext.Provider value={value}>
            {children}
        </InventoryItemContext.Provider>
    );
};

export default InventoryItemProvider;

