import { create } from "zustand";
import { isDateKey } from "./taskDates";

export const NOTES_STORAGE_KEY = "notes";
const BACKUP_VERSION = 1;

function isRecord(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isValidId(id) {
    return (Number.isSafeInteger(id) && id > 0) || (typeof id === "string" && id.trim() !== "");
}

function readTaskList(value) {
    if (!Array.isArray(value)) throw new Error("The task list is invalid.");

    const ids = new Set();
    return value.map((task) => {
        if (!isRecord(task) || !isValidId(task.id) || ids.has(String(task.id))
            || typeof task.name !== "string" || task.name === "") {
            throw new Error("A task is invalid or has a duplicate ID.");
        }

        const { date = "", priority = {}, subject = "", details = "", completedAt = null } = task;

        if ((date !== "" && !isDateKey(date)) || !isRecord(priority)
            || typeof subject !== "string" || typeof details !== "string"
            || (completedAt !== null && (typeof completedAt !== "string"
                || !Number.isFinite(Date.parse(completedAt))))
            || (priority.important !== undefined && typeof priority.important !== "boolean")
            || (priority.currency !== undefined && typeof priority.currency !== "boolean")) {
            throw new Error("A task has invalid fields.");
        }

        ids.add(String(task.id));
        return { ...task, date, priority: { important: false, ...priority }, subject, details, completedAt };
    });
}

function readStoredTasks() {
    try {
        const stored = localStorage.getItem(NOTES_STORAGE_KEY);
        return stored === null ? [] : readTaskList(JSON.parse(stored));
    } catch {
        throw new Error("Couldn’t read tasks from browser storage. You can restore a task backup.");
    }
}

export function parseTaskBackup(contents) {
    try {
        const backup = JSON.parse(contents);
        if (!isRecord(backup) || backup.version !== BACKUP_VERSION) {
            throw new Error("Unsupported task backup.");
        }
        return readTaskList(backup.notes);
    } catch {
        throw new Error("Couldn’t open this file. Choose a valid productIVE task backup.");
    }
}

function updateTask(tasks, id, update) {
    const index = tasks.findIndex((task) => task.id === id);
    if (index < 0) throw new Error("This task was removed. Refresh the list and try again.");

    const updated = [...tasks];
    updated[index] = update(updated[index]);
    return updated;
}

export const useNotesStore = create((set) => {
    function writeTasks(notes) {
        try {
            localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
        } catch {
            throw new Error("Couldn’t save tasks. Check that browser storage is available and try again.");
        }
        set({ notes, loadError: "" });
    }

    return {
        notes: [],
        loadError: "",
        initializeNotes: () => {
            try {
                set({ notes: readStoredTasks(), loadError: "" });
            } catch (error) {
                set({ loadError: error.message });
            }
        },

        saveTask: (draft, id) => {
            const name = draft.name.trim();
            if (!name) throw new Error("Enter a task title.");
            if (draft.date && !isDateKey(draft.date)) throw new Error("Enter a valid due date.");

            const notes = readStoredTasks();
            const values = {
                name,
                date: draft.date,
                subject: draft.subject.trim(),
                details: draft.details.trim(),
            };
            const save = (task) => ({
                ...task,
                ...values,
                priority: { ...task.priority, important: draft.important },
            });

            if (id !== undefined) {
                writeTasks(updateTask(notes, id, save));
                return;
            }

            const newId = crypto.getRandomValues(new Uint32Array(4)).join("-");
            writeTasks([...notes, save({ id: newId, completedAt: null })]);
        },

        setTaskCompleted: (id, completed) => {
            writeTasks(updateTask(readStoredTasks(), id, (task) => ({
                ...task,
                completedAt: completed ? task.completedAt || new Date().toISOString() : null,
            })));
        },

        deleteTask: (id) => writeTasks(readStoredTasks().filter((task) => task.id !== id)),

        exportTasks: () => JSON.stringify({ version: BACKUP_VERSION, notes: readStoredTasks() }, null, 2),

        restoreTasks: (tasks) => writeTasks(readTaskList(tasks)),
    };
});
