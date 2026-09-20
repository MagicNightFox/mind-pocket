import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listProducts, createProduct } from '../../calls.js';
import {QUERY_KEYS} from "../../Constants.js"; // Your axios calls

// 1. Hook for fetching
export const useProducts = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.productQueryData],
        queryFn: listProducts,
    });
};

// 2. Hook for mutating (Creates the product AND invalidates the cache)
export const useCreateProduct = () => {
    const queryClient = useQueryClient(); // Only declared once in this hook!

    return useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            // Automatically triggers a refetch of the 'products' query
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.productQueryData] });
        },
    });
};