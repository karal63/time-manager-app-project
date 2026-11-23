import { useEffect, useId, useRef, useState } from "react";

export default function TaskDialog({ title, children, onClose }) {
    const titleId = useId();
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        dialog.showModal();
        return () => dialog.close();
    }, []);

    return (
        <dialog ref={dialogRef} className="task-dialog" aria-labelledby={titleId} onCancel={(event) => {
            event.preventDefault();
            onClose();
        }}>
            <h2 id={titleId}>{title}</h2>
            {children}
        </dialog>
    );
}

export function TaskConfirmation({ title, children, label, destructive, onClose, onConfirm }) {
    const [error, setError] = useState("");

    function confirm() {
        try {
            onConfirm();
        } catch (confirmError) {
            setError(confirmError.message);
        }
    }

    return (
        <TaskDialog title={title} onClose={onClose}>
            <p className="task-dialog-description">{children}</p>
            {error && <p className="task-error" role="alert">{error}</p>}
            <div className="task-dialog-actions">
                <button type="button" onClick={onClose}>Cancel</button>
                <button type="button" className={destructive ? "task-danger-button" : "task-primary"} onClick={confirm}>{label}</button>
            </div>
        </TaskDialog>
    );
}
