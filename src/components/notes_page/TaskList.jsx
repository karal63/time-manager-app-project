import { LuCalendarDays, LuChevronDown, LuListTodo, LuMoreHorizontal, LuPencil, LuStar, LuTrash2 } from "react-icons/lu";
import { compareDateKeys, deadlineLabel, relativeDeadlineLabel } from "../../taskDates";
import TaskActions from "./TaskActions";

function TaskRow({ task, today, showDeadline, onComplete, onEdit, onDelete }) {
    const completed = Boolean(task.completedAt);

    return (
        <li className="task-row" data-complete={completed || undefined}>
            <label className="task-completion">
                <input
                    type="checkbox"
                    checked={completed}
                    aria-label={`${completed ? "Reopen" : "Complete"} ${task.name}`}
                    onChange={(event) => onComplete(task, event.target.checked)}
                />
            </label>
            <div className="task-row-content">
                <div className="task-row-title">
                    <span>{task.name}</span>
                    {task.priority.important && <span className="task-important"><LuStar aria-hidden="true" /> Important</span>}
                </div>
                {(showDeadline || task.subject) && (
                    <div className="task-row-meta">
                        {showDeadline && (
                            <span>
                                <LuCalendarDays aria-hidden="true" />
                                {task.date ? <time dateTime={task.date}>{deadlineLabel(task.date, today)}</time> : "No due date"}
                            </span>
                        )}
                        {task.subject && <span className="task-tag">{task.subject}</span>}
                    </div>
                )}
                {task.details && (
                    <details className="task-row-details">
                        <summary>Details <LuChevronDown aria-hidden="true" /></summary>
                        <p>{task.details}</p>
                    </details>
                )}
            </div>
            <TaskActions
                label={`Actions for ${task.name}`}
                icon={LuMoreHorizontal}
                actions={[
                    { label: "Edit", icon: LuPencil, run: () => onEdit(task) },
                    { label: "Delete", icon: LuTrash2, run: () => onDelete(task), danger: true },
                ]}
            />
        </li>
    );
}

export default function TaskList({ tasks, today, tomorrow, filtered, clearFilters, headingRef, onComplete, onEdit, onDelete }) {
    const scheduled = new Map();
    const overdue = [];
    const undated = [];
    const completed = [];

    for (const task of tasks) {
        if (task.completedAt) completed.push(task);
        else if (!task.date) undated.push(task);
        else if (compareDateKeys(task.date, today) < 0) overdue.push(task);
        else {
            if (!scheduled.has(task.date)) scheduled.set(task.date, []);
            scheduled.get(task.date).push(task);
        }
    }

    overdue.sort((first, second) => compareDateKeys(first.date, second.date));
    completed.sort((first, second) => Date.parse(second.completedAt) - Date.parse(first.completedAt));

    const groups = [
        { key: "overdue", label: "Overdue", items: overdue, showRowDates: true },
        ...[...scheduled.entries()]
            .sort(([first], [second]) => compareDateKeys(first, second))
            .map(([date, items]) => ({ key: date, date, label: relativeDeadlineLabel(date, today, tomorrow), items })),
        { key: "undated", label: "No due date", items: undated },
    ];

    const renderTask = (task, showDeadline) => (
        <TaskRow key={task.id} task={task} today={today} showDeadline={showDeadline} onComplete={onComplete} onEdit={onEdit} onDelete={onDelete} />
    );

    return (
        <section className="task-list" aria-labelledby="task-list-title">
            <h2 id="task-list-title" className="sr-only" ref={headingRef} tabIndex={-1}>Task list</h2>
            {(!tasks.length || tasks.length === completed.length) && (
                <div className="task-empty">
                    <LuListTodo aria-hidden="true" />
                    <p>{tasks.length ? "No open tasks" : (filtered ? "No matching tasks" : "No tasks yet")}</p>
                    {!tasks.length && filtered && <button type="button" onClick={clearFilters}>Clear filters</button>}
                    {!tasks.length && !filtered && <span>Add an assignment above to get started.</span>}
                </div>
            )}
            {groups.filter(({ items }) => items.length > 0).map(({ key, date, label, items, showRowDates }) => {
                const headingId = `task-group-${key}`;
                const formattedDate = date && <time dateTime={date}>{deadlineLabel(date, today)}</time>;

                return (
                    <section key={key} className="task-group" data-deadline={label || undefined} aria-labelledby={headingId}>
                        <header className="task-group-heading">
                            <div>
                                <h3 id={headingId}>{label || formattedDate}</h3>
                                {label && formattedDate}
                            </div>
                            <span className="task-group-count">{items.length}</span>
                        </header>
                        <ul className="task-rows">{items.map((task) => renderTask(task, showRowDates))}</ul>
                    </section>
                );
            })}
            {completed.length > 0 && (
                <details className="task-completed" open={filtered || undefined}>
                    <summary><LuChevronDown aria-hidden="true" /> Completed <span>{completed.length}</span></summary>
                    <ul className="task-rows">{completed.map((task) => renderTask(task, true))}</ul>
                </details>
            )}
        </section>
    );
}
