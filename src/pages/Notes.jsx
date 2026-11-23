import { useEffect, useRef, useState } from "react";
import { LuDownload, LuMenu, LuSearch, LuUpload } from "react-icons/lu";
import DeadlineStrip from "../components/notes_page/DeadlineStrip";
import TaskActions from "../components/notes_page/TaskActions";
import TaskDialog, { TaskConfirmation } from "../components/notes_page/TaskDialog";
import TaskForm from "../components/notes_page/TaskForm";
import TaskList from "../components/notes_page/TaskList";
import { NOTES_STORAGE_KEY, parseTaskBackup, useNotesStore } from "../notesStore";
import { addCalendarDays, compareDateKeys, deadlineLabel, localDateKey, relativeDeadlineLabel } from "../taskDates";
import "../components/notes_page/tasks.css";

const emptyFilters = { search: "", subject: "", important: false, date: "" };

function useToday() {
    const [today, setToday] = useState(() => localDateKey());

    useEffect(() => {
        let timer;

        function syncToday() {
            const now = new Date();
            setToday(localDateKey(now));
            const midnight = new Date(now);
            midnight.setHours(24, 0, 0, 0);
            window.clearTimeout(timer);
            timer = window.setTimeout(syncToday, midnight - now + 25);
        }

        syncToday();
        window.addEventListener("focus", syncToday);
        document.addEventListener("visibilitychange", syncToday);
        return () => {
            window.clearTimeout(timer);
            window.removeEventListener("focus", syncToday);
            document.removeEventListener("visibilitychange", syncToday);
        };
    }, []);

    return today;
}

export default function Notes() {
    const {
        notes, loadError, initializeNotes, saveTask, setTaskCompleted, deleteTask, exportTasks, restoreTasks,
    } = useNotesStore();
    const today = useToday();
    const tomorrow = addCalendarDays(today, 1);
    const [filters, setFilters] = useState(emptyFilters);
    const [dialog, setDialog] = useState(null);
    const [error, setError] = useState("");
    const [status, setStatus] = useState("");
    const [readingBackup, setReadingBackup] = useState(false);
    const backupInput = useRef(null);
    const listHeading = useRef(null);

    useEffect(() => {
        initializeNotes();

        function syncNotes(event) {
            if (event.key === NOTES_STORAGE_KEY || event.key === null) initializeNotes();
        }

        window.addEventListener("storage", syncNotes);
        return () => window.removeEventListener("storage", syncNotes);
    }, [initializeNotes]);

    const subjectsByKey = new Map();
    for (const task of notes) {
        if (task.subject) subjectsByKey.set(task.subject.toLocaleLowerCase(), task.subject);
    }
    const subjects = [...subjectsByKey.values()].sort((first, second) => first.localeCompare(second));
    const subjectKey = filters.subject.toLocaleLowerCase();
    const selectedSubject = subjectsByKey.get(subjectKey) ?? "";
    const selectedDate = filters.date && compareDateKeys(filters.date, today) >= 0
        && compareDateKeys(filters.date, addCalendarDays(today, 6)) <= 0 ? filters.date : "";
    const search = filters.search.trim().toLocaleLowerCase();
    const searchTerms = search ? search.split(/\s+/) : [];
    const filtered = Boolean(search || selectedSubject || filters.important || selectedDate);

    const visible = notes.filter((task) => {
        if (selectedDate && task.date !== selectedDate) return false;
        if (selectedSubject && task.subject.toLocaleLowerCase() !== subjectKey) return false;
        if (filters.important && !task.priority.important) return false;
        if (!searchTerms.length) return true;

        const relativeLabel = task.completedAt ? "" : relativeDeadlineLabel(task.date, today, tomorrow);
        const text = [task.name, task.subject, task.details, task.date, deadlineLabel(task.date, today), relativeLabel]
            .join(" ").toLocaleLowerCase();
        return searchTerms.every((term) => text.includes(term));
    });

    function updateFilter(field, value) {
        setFilters((current) => ({ ...current, [field]: value }));
    }

    function completeTask(task, completed) {
        try {
            setTaskCompleted(task.id, completed);
            setError("");
            setStatus(`${task.name} ${completed ? "completed" : "reopened"}.`);
            listHeading.current?.focus({ preventScroll: true });
        } catch (completionError) {
            setError(completionError.message);
        }
    }

    function downloadBackup() {
        try {
            const backup = new Blob([exportTasks()], { type: "application/json" });
            const url = URL.createObjectURL(backup);
            const link = document.createElement("a");
            link.href = url;
            link.download = `productive-tasks-${today}.json`;
            link.click();
            window.setTimeout(() => URL.revokeObjectURL(url), 1000);
            setError("");
            setStatus("Task backup downloaded.");
        } catch (exportError) {
            setError(exportError.message);
        }
    }

    async function previewBackup(event) {
        const file = event.target.files[0];
        event.target.value = "";
        if (!file) return;

        setReadingBackup(true);
        setError("");
        try {
            const tasks = parseTaskBackup(await file.text());
            setDialog({ kind: "restore", tasks });
        } catch (backupError) {
            setError(backupError.message);
        } finally {
            setReadingBackup(false);
        }
    }

    function finishConfirmation(message) {
        setDialog(null);
        setError("");
        setStatus(message);
        window.requestAnimationFrame(() => listHeading.current?.focus({ preventScroll: true }));
    }

    return (
        <main className="tasks-page">
            <div className="tasks-content">
                <header className="tasks-header">
                    <h1>Tasks</h1>
                    <TaskActions
                        label="Task options"
                        icon={LuMenu}
                        className="task-header-actions"
                        actions={[
                            { label: "Export tasks", icon: LuDownload, run: downloadBackup },
                            { label: "Restore tasks", icon: LuUpload, run: () => backupInput.current?.click(), disabled: readingBackup },
                        ]}
                    />
                    <input ref={backupInput} type="file" accept="application/json,.json" aria-label="Task backup file" onChange={previewBackup} hidden />
                </header>
                {(error || loadError) && <p className="task-error" role="alert">{error || loadError}</p>}
                <p className="sr-only" role="status">{status}</p>

                <TaskForm subjects={subjects} onSave={(draft) => {
                    saveTask(draft);
                    setError("");
                    setStatus(`${draft.name.trim()} added.`);
                }} />

                <DeadlineStrip today={today} tasks={notes} selectedDate={selectedDate} onSelect={(date) => updateFilter("date", date)} />

                <div className="task-filters" role="group" aria-label="Filter tasks">
                    <label className="task-search">
                        <LuSearch aria-hidden="true" />
                        <span className="sr-only">Search tasks</span>
                        <input type="search" value={filters.search} onChange={(event) => updateFilter("search", event.target.value)} placeholder="Search tasks" />
                    </label>
                    <label className="task-subject-filter">
                        <span className="sr-only">Filter by subject</span>
                        <select value={selectedSubject} onChange={(event) => updateFilter("subject", event.target.value)}>
                            <option value="">All subjects</option>
                            {subjects.map((subject) => <option key={subject}>{subject}</option>)}
                        </select>
                    </label>
                    <label className="task-check-label task-important-filter">
                        <input type="checkbox" checked={filters.important} onChange={(event) => updateFilter("important", event.target.checked)} /> Important
                    </label>
                    {filtered && visible.length > 0 && (
                        <button type="button" className="task-text-button" onClick={() => setFilters(emptyFilters)}>Clear filters</button>
                    )}
                </div>

                <TaskList
                    tasks={visible}
                    today={today}
                    tomorrow={tomorrow}
                    filtered={filtered}
                    clearFilters={() => setFilters(emptyFilters)}
                    headingRef={listHeading}
                    onComplete={completeTask}
                    onEdit={(task) => setDialog({ kind: "edit", task })}
                    onDelete={(task) => setDialog({ kind: "delete", task })}
                />

                {dialog?.kind === "edit" && (
                    <TaskDialog title="Edit task" onClose={() => setDialog(null)}>
                        <TaskForm task={dialog.task} subjects={subjects} onCancel={() => setDialog(null)} onSave={(draft) => {
                            saveTask(draft, dialog.task.id);
                            setDialog(null);
                            setError("");
                            setStatus(`${draft.name.trim()} updated.`);
                        }} />
                    </TaskDialog>
                )}
                {dialog?.kind === "delete" && (
                    <TaskConfirmation title="Delete task?" label="Delete task" destructive onClose={() => setDialog(null)} onConfirm={() => {
                        deleteTask(dialog.task.id);
                        finishConfirmation(`${dialog.task.name} deleted.`);
                    }}>
                        Delete “{dialog.task.name}” from your task list?
                    </TaskConfirmation>
                )}
                {dialog?.kind === "restore" && (
                    <TaskConfirmation title="Restore tasks?" label="Replace tasks" onClose={() => setDialog(null)} onConfirm={() => {
                        restoreTasks(dialog.tasks);
                        setFilters(emptyFilters);
                        finishConfirmation("Tasks restored.");
                    }}>
                        This backup contains {dialog.tasks.length} {dialog.tasks.length === 1 ? "task" : "tasks"}. Restoring it will replace all tasks currently saved in this browser.
                    </TaskConfirmation>
                )}
            </div>
        </main>
    );
}
