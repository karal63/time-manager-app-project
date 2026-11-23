import { addCalendarDays, formatTaskDate, isWeekend } from "../../taskDates";

export default function DeadlineStrip({ today, selectedDate, onSelect, tasks }) {
    const counts = new Map();
    for (const task of tasks) {
        if (task.date && !task.completedAt) counts.set(task.date, (counts.get(task.date) ?? 0) + 1);
    }

    const week = Array.from({ length: 7 }, (_, index) => addCalendarDays(today, index));
    const rangeOptions = { month: "short", day: "numeric" };

    return (
        <section className="task-week" aria-labelledby="task-week-title">
            <div className="task-section-heading">
                <h2 id="task-week-title">Next 7 days</h2>
                <span>{formatTaskDate(today, rangeOptions)} – {formatTaskDate(week[6], rangeOptions)}</span>
            </div>
            <div className="task-week-grid">
                {week.map((date) => {
                    const count = counts.get(date) ?? 0;
                    const isToday = date === today;
                    const label = formatTaskDate(date, { ...rangeOptions, weekday: "long" });

                    return (
                        <button
                            key={date}
                            type="button"
                            className="task-week-day"
                            data-today={isToday || undefined}
                            data-empty-weekend={count === 0 && isWeekend(date) || undefined}
                            aria-pressed={date === selectedDate}
                            aria-label={`${isToday ? "Today, " : ""}${label}, ${count} open ${count === 1 ? "task" : "tasks"}`}
                            onClick={() => onSelect(date === selectedDate ? "" : date)}
                        >
                            <span>{isToday ? "Today" : formatTaskDate(date, { weekday: "short" })}</span>
                            <strong>{formatTaskDate(date, { day: "numeric" })}</strong>
                            <span className="task-week-count" data-empty={count === 0 || undefined}>{count}</span>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
