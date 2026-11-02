import {useMemo, useState} from "react";
import {ProductContext} from "../../context/ProductContext.jsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {QUERY_KEYS} from "../../Constants.js";
import {createProduct, deleteProduct, listProducts, updateProduct} from "../../calls.js";
const ProductProvider = ({ children }) => {
    const queryClient = useQueryClient();
    const [listDtoIn, setListDtoIn] = useState({});

    // 1. LIST Query (Fetches all/filtered products)
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: [QUERY_KEYS.productQueryData, listDtoIn],
        queryFn: () => listProducts(listDtoIn),
    });

    // 2. CREATE Mutation
    const createMutation = useMutation({
        mutationFn: (dtoIn) => createProduct(dtoIn),
        onSuccess: () => {
            // Invalidate and refetch the product list
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.productQueryData] });
        },
    });

    // 3. UPDATE Mutation
    const updateMutation = useMutation({
        mutationFn: (dtoIn) => updateProduct(dtoIn),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.productQueryData] });
        },
    });

    // 4. DELETE Mutation
    const deleteMutation = useMutation({
        mutationFn: (id) => deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.productQueryData] });
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
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;

