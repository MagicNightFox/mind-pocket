import {useMemo, useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {NoteContext} from "../../context/NoteContext.jsx";
import {createNote, deleteNote, listNotes, updateNote} from "../../calls.js";
import {QUERY_KEYS} from "../../Constants.js";
const NoteProvider = ({ children }) => {
    const queryClient = useQueryClient();
    const [listDtoIn, setListDtoIn] = useState({});

    // 1. LIST Query (Fetches all/filtered products)
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: [QUERY_KEYS.noteQueryData, listDtoIn],
        queryFn: () => listNotes(listDtoIn),
    });

    // 2. CREATE Mutation
    const createMutation = useMutation({
        mutationFn: (dtoIn) => createNote(dtoIn),
        onSuccess: () => {
            // Invalidate and refetch the product list
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.noteQueryData] });
        },
    });

    // 3. UPDATE Mutation
    const updateMutation = useMutation({
        mutationFn: (dtoIn) => updateNote(dtoIn),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.noteQueryData] });
        },
    });

    // 4. DELETE Mutation
    const deleteMutation = useMutation({
        mutationFn: (id) => deleteNote(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.noteQueryData] });
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
        get: (id) => data.data.find((item) => item.id === id),

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
        <NoteContext.Provider value={value}>
            {children}
        </NoteContext.Provider>
    );
};

export default NoteProvider;

