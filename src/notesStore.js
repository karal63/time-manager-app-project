import { create } from "zustand";

export const useNotesStore = create((set, get) => ({
    saveToLocalStorage: (name, data) => {
        localStorage.setItem(name, JSON.stringify(data));
    },

    getFromLocalStorage: (key, localStorageKey) =>
        set((state) => {
            const response = localStorage.getItem(localStorageKey);
            const data = response ? JSON.parse(response) : state[key];

            return {
                [key]: data,
            };
        }),

    returnFromLocalStorage: (key) => {
        const response = localStorage.getItem(key);
        return response ? JSON.parse(response) : null;
    },

    getNextId: (items) => {
        return items.length > 0
            ? Math.max(...items.map((item) => item.id)) + 1
            : 1;
    },

    notes: [],
    addNote: (note) =>
        set((state) => {
            const newNotes = [
                ...state.notes,
                { ...note, id: state.getNextId(state.notes) },
            ];
            state.saveToLocalStorage("notes", newNotes);

            return {
                notes: newNotes,
            };
        }),

    initializeNotes: () => {
        const localData = get().returnFromLocalStorage("notes");

        set({
            notes: localData || [
                {
                    id: 1,
                    name: "Sprawdzian z matematyki",
                    date: "2025-02-21",
                    priority: { currency: false, important: true },
                },

                {
                    id: 2,
                    name: "Kartkówka z biznesu",
                    date: "2025-02-23",
                    priority: { currency: false, important: true },
                },
            ],
        });
    },

    sortMethod: "Date (A to Z)",
    setSortMethod: (value) =>
        set(() => ({
            sortMethod: value,
        })),

    isFilterPanelOpen: false,
    setIsFilterPanelOpen: (value) =>
        set(() => ({
            isFilterPanelOpen: value,
        })),

    isHandleBarOpen: false,
    setIsHandleBarOpen: (value) =>
        set(() => ({
            isHandleBarOpen: value,
        })),

    deleteNote: (id) =>
        set((state) => {
            const newNotes = state.notes.filter((note) => note.id !== id);
            state.saveToLocalStorage("notes", newNotes);
            return {
                notes: newNotes,
            };
        }),

    editingNote: {
        isEditing: false,
        note: {},
    },

    setEditingNote: (value, note) =>
        set(() => ({
            editingNote: {
                isEditing: value,
                note: { ...note },
            },
        })),

    editNote: (newNote) =>
        set((state) => {
            const newNotes = state.notes.map((note) => {
                if (note.id === newNote.id) {
                    return { ...newNote };
                }
                return note;
            });
            state.saveToLocalStorage("notes", newNotes);

            return {
                notes: newNotes,
            };
        }),

    searchQuery: "",
    setSearchQuery: (query) => set(() => ({ searchQuery: query })),
}));
