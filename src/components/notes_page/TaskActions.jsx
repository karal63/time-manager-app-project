import { useEffect, useRef, useState } from "react";

export default function TaskActions({ label, icon: Icon, actions, className = "" }) {
    const [open, setOpen] = useState(false);
    const triggerRef = useRef(null);
    const actionsRef = useRef(null);

    useEffect(() => {
        if (!open) return;

        function closeOnOutsidePress(event) {
            if (!actionsRef.current?.contains(event.target)) setOpen(false);
        }

        document.addEventListener("pointerdown", closeOnOutsidePress);
        return () => document.removeEventListener("pointerdown", closeOnOutsidePress);
    }, [open]);

    function closeAndFocus() {
        setOpen(false);
        triggerRef.current?.focus();
    }

    return (
        <div
            ref={actionsRef}
            className={`task-actions ${className}`}
            onBlur={(event) => {
                if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) setOpen(false);
            }}
            onKeyDown={(event) => {
                if (event.key === "Escape" && open) closeAndFocus();
            }}
        >
            <button
                ref={triggerRef}
                type="button"
                className="task-icon-button"
                aria-label={label}
                aria-expanded={open}
                onClick={() => setOpen(!open)}
            ><Icon aria-hidden="true" /></button>
            {open && (
                <div className="task-action-popover">
                    {actions.map(({ label, icon: ActionIcon, run, disabled, danger }) => (
                        <button
                            key={label}
                            type="button"
                            className={danger ? "task-danger-text" : undefined}
                            disabled={disabled}
                            onClick={() => { closeAndFocus(); run(); }}
                        ><ActionIcon aria-hidden="true" /> {label}</button>
                    ))}
                </div>
            )}
        </div>
    );
}
