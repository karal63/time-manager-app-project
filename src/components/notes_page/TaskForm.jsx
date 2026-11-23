import { useId, useRef, useState } from "react";
import { LuChevronDown, LuPlus } from "react-icons/lu";

const emptyDraft = { name: "", date: "", subject: "", details: "", important: false };

export default function TaskForm({ task, subjects, onSave, onCancel }) {
    const titleId = useId();
    const titleRef = useRef(null);
    const subjectRef = useRef(null);
    const [draft, setDraft] = useState(() => task ? { ...task, important: task.priority.important } : emptyDraft);
    const [showDetails, setShowDetails] = useState(Boolean(task));
    const [error, setError] = useState("");
    const subjectQuery = draft.subject.trim().toLocaleLowerCase();
    const matchingSubjects = subjects.filter((subject) => subject.toLocaleLowerCase().includes(subjectQuery));
    const suggestions = matchingSubjects.some((subject) => subject.toLocaleLowerCase() === subjectQuery)
        ? []
        : matchingSubjects.slice(0, 6);

    function updateDraft(field, value) {
        setDraft((current) => ({ ...current, [field]: value }));
    }

    function submit(event) {
        event.preventDefault();
        try {
            // A selected suggestion and a typed equivalent keep the same subject name.
            const subject = subjects.find((name) => name.toLocaleLowerCase() === subjectQuery) ?? draft.subject;
            onSave({ ...draft, subject });
            setError("");
            if (!task) {
                setDraft(emptyDraft);
                setShowDetails(false);
                titleRef.current?.focus();
            }
        } catch (saveError) {
            setError(saveError.message);
        }
    }

    return (
        <form className={`task-form${task ? " task-form-edit" : ""}`} onSubmit={submit} aria-label={task ? "Edit task" : "Add task"}>
            <label className={task ? "task-field-label" : "sr-only"} htmlFor={titleId}>Task title</label>
            <div className="task-form-title">
                <input
                    id={titleId}
                    ref={titleRef}
                    value={draft.name}
                    onChange={(event) => updateDraft("name", event.target.value)}
                    placeholder="What’s your assignment?"
                    required
                />
                {!task && (
                    <button type="submit" className="task-primary">
                        <LuPlus aria-hidden="true" /> Add task
                    </button>
                )}
            </div>
            <div className="task-form-options">
                <div className="task-due-options">
                    <label className="task-due-date">
                        <span>Due date</span>
                        <input type="date" value={draft.date} onChange={(event) => updateDraft("date", event.target.value)} />
                    </label>
                    {draft.date && (
                        <button type="button" className="task-text-button" onClick={() => updateDraft("date", "")}>Clear date</button>
                    )}
                </div>
                {!task && (
                    <button type="button" className="task-text-button" aria-expanded={showDetails} onClick={() => setShowDetails(!showDetails)}>
                        Task details <LuChevronDown className={showDetails ? "task-chevron-open" : ""} aria-hidden="true" />
                    </button>
                )}
            </div>
            {showDetails && (
                <div className="task-form-details">
                    <label className="task-field">
                        <span>Subject</span>
                        <input ref={subjectRef} value={draft.subject} onChange={(event) => updateDraft("subject", event.target.value)} placeholder="e.g. Maths" />
                    </label>
                    {suggestions.length > 0 && (
                        <div className="task-subject-suggestions" aria-label="Existing subjects" role="group">
                            {suggestions.map((subject) => (
                                <button key={subject} type="button" onClick={() => {
                                    updateDraft("subject", subject);
                                    subjectRef.current?.focus();
                                }}>{subject}</button>
                            ))}
                        </div>
                    )}
                    <label className="task-field">
                        <span>Details</span>
                        <textarea rows={3} value={draft.details} onChange={(event) => updateDraft("details", event.target.value)} placeholder="Instructions or a link" />
                    </label>
                    <label className="task-check-label">
                        <input type="checkbox" checked={draft.important} onChange={(event) => updateDraft("important", event.target.checked)} />
                        Important
                    </label>
                </div>
            )}
            {error && <p role="alert" className="task-error">{error}</p>}
            {task && (
                <div className="task-dialog-actions">
                    <button type="button" onClick={onCancel}>Cancel</button>
                    <button type="submit" className="task-primary">Save changes</button>
                </div>
            )}
        </form>
    );
}
