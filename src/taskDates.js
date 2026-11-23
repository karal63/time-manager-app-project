function dateKey(year, month, day) {
    return [
        String(year).padStart(4, "0"),
        String(month).padStart(2, "0"),
        String(day).padStart(2, "0"),
    ].join("-");
}

export function localDateKey(date = new Date()) {
    return dateKey(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

// UTC holds the calendar fields without shifting a date-only deadline by timezone.
function calendarDate(key) {
    const [year, month, day] = key.split("-").map(Number);
    const date = new Date(0);
    date.setUTCFullYear(year, month - 1, day);
    return date;
}

function calendarKey(date) {
    return dateKey(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
}

export function isDateKey(key) {
    return typeof key === "string" && /^\d{4,6}-\d\d-\d\d$/.test(key)
        && key.split("-")[0] !== "0000" && calendarKey(calendarDate(key)) === key;
}

export function addCalendarDays(key, days) {
    const date = calendarDate(key);
    date.setUTCDate(date.getUTCDate() + days);
    return calendarKey(date);
}

export function compareDateKeys(first, second) {
    return first.length - second.length || first.localeCompare(second);
}

export function isWeekend(key) {
    const weekday = calendarDate(key).getUTCDay();
    return weekday === 0 || weekday === 6;
}

export function formatTaskDate(key, options) {
    return new Intl.DateTimeFormat(undefined, { ...options, timeZone: "UTC" })
        .format(calendarDate(key));
}

export function relativeDeadlineLabel(key, today, tomorrow) {
    if (!key) return "No due date";
    if (key === today) return "Today";
    if (key === tomorrow) return "Tomorrow";
    if (compareDateKeys(key, today) < 0) return "Overdue";
    return "";
}

export function deadlineLabel(key, today) {
    if (!key) return "No due date";

    return formatTaskDate(key, {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: key.split("-")[0] === today.split("-")[0] ? undefined : "numeric",
    });
}
