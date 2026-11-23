import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import Notes from "../pages/Notes";
import { parseTaskBackup, useNotesStore } from "../notesStore";
import { addCalendarDays, deadlineLabel, localDateKey } from "../taskDates";

const legacyTask = {
    id: 42,
    name: "Biology homework",
    date: "2026-03-06",
    priority: { important: true, currency: true },
};

function addForm() {
    return within(screen.getByRole("form", { name: "Add task" }));
}

function addTask(name, setup = () => {}) {
    const form = addForm();
    fireEvent.change(form.getByRole("textbox", { name: "Task title" }), { target: { value: name } });
    setup(form);
    fireEvent.click(form.getByRole("button", { name: "Add task" }));
}

function setDueDate(form, date) {
    fireEvent.change(form.getByLabelText("Due date"), { target: { value: date } });
}

function storedTasks() {
    return JSON.parse(localStorage.getItem("notes"));
}

function chooseBackup(contents) {
    const input = screen.getByLabelText("Task backup file");
    const file = new File([contents], "notes.json", { type: "application/json" });
    file.text = async () => contents;
    fireEvent.change(input, { target: { files: [file] } });
}

beforeAll(() => {
    // jsdom lacks the native modal methods used by the task editor and confirmation.
    if (!HTMLDialogElement.prototype.showModal) {
        HTMLDialogElement.prototype.showModal = function () { this.open = true; };
        HTMLDialogElement.prototype.close = function () { this.open = false; };
    }
});

beforeEach(() => {
    vi.stubGlobal("localStorage", globalThis.jsdom.window.localStorage);
    localStorage.clear();
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 2, 7, 12));
});

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.useRealTimers();
});

describe("Tasks page", () => {
    it("loads legacy homework as overdue and saves completion and reopening across mounts", () => {
        localStorage.setItem("notes", JSON.stringify([legacyTask]));
        const firstVisit = render(<Notes />);
        expect(screen.getByRole("heading", { name: /Overdue/ })).toBeTruthy();
        expect(storedTasks()).toEqual([legacyTask]);

        fireEvent.click(screen.getByRole("checkbox", { name: "Complete Biology homework" }));
        expect(storedTasks()[0]).toMatchObject({ ...legacyTask, completedAt: expect.any(String) });
        firstVisit.unmount();

        render(<Notes />);
        fireEvent.click(screen.getByText("Completed", { selector: "summary" }));
        fireEvent.click(screen.getByRole("checkbox", { name: "Reopen Biology homework" }));
        expect(screen.getByRole("heading", { name: /Overdue/ })).toBeTruthy();
        expect(storedTasks()[0]).toMatchObject({ ...legacyTask, completedAt: null });
    });

    it("combines day, subject, importance and text filters and updates counts after editing", () => {
        render(<Notes />);
        expect(screen.getByText("No tasks yet")).toBeTruthy();

        addTask("Reading");
        addTask("Worksheet", (form) => {
            setDueDate(form, "2026-03-08");
            fireEvent.click(form.getByRole("button", { name: "Task details" }));
            fireEvent.change(form.getByRole("textbox", { name: "Subject" }), { target: { value: "Maths" } });
            fireEvent.change(form.getByRole("textbox", { name: "Details" }), { target: { value: "Triangle proofs" } });
            fireEvent.click(form.getByRole("checkbox", { name: "Important" }));
        });
        addTask("Revision", (form) => {
            setDueDate(form, "2026-03-08");
            fireEvent.click(form.getByRole("button", { name: "Task details" }));
            fireEvent.click(form.getByRole("button", { name: "Maths" }));
        });

        fireEvent.click(screen.getByRole("button", { name: /Sunday.*2 open tasks/ }));
        const filters = within(screen.getByRole("group", { name: "Filter tasks" }));
        fireEvent.change(filters.getByRole("combobox"), { target: { value: "Maths" } });
        fireEvent.click(filters.getByRole("checkbox", { name: "Important" }));
        fireEvent.change(filters.getByRole("searchbox"), { target: { value: "triangle Tomorrow" } });
        expect(screen.getByRole("checkbox", { name: "Complete Worksheet" })).toBeTruthy();
        expect(screen.queryByRole("checkbox", { name: /Complete (Reading|Revision)/ })).toBeNull();

        fireEvent.change(filters.getByRole("searchbox"), { target: { value: "Physics" } });
        expect(screen.getByText("No matching tasks")).toBeTruthy();
        fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
        expect(screen.getByRole("checkbox", { name: "Complete Reading" })).toBeTruthy();

        fireEvent.click(screen.getByRole("button", { name: "Actions for Worksheet" }));
        fireEvent.click(screen.getByRole("button", { name: "Edit" }));
        const editor = within(screen.getByRole("dialog", { name: "Edit task" }));
        setDueDate(editor, "2026-03-07");
        fireEvent.click(editor.getByRole("button", { name: "Save changes" }));
        expect(screen.getByRole("button", { name: /Today.*1 open task/ })).toBeTruthy();
        expect(screen.getByRole("button", { name: /Sunday.*1 open task/ })).toBeTruthy();
    });

    it("shows Tomorrow and separates later assignments by their exact due dates", () => {
        const tasks = [
            { ...legacyTask, id: 1, name: "Tuesday essay", date: "2026-03-10" },
            { ...legacyTask, id: 2, name: "Tomorrow worksheet", date: "2026-03-08" },
            { ...legacyTask, id: 3, name: "Monday reading", date: "2026-03-09" },
            { ...legacyTask, id: 4, name: "Tomorrow revision", date: "2026-03-08" },
        ];
        localStorage.setItem("notes", JSON.stringify(tasks));
        render(<Notes />);

        const tomorrow = within(screen.getByRole("region", { name: "Tomorrow" }));
        expect(tomorrow.getAllByRole("checkbox")).toHaveLength(2);
        expect(tomorrow.getByText(/Sunday/)).toBeTruthy();
        const headings = screen.getAllByRole("heading", { level: 3 });
        expect(headings.map((heading) => heading.textContent)).toEqual([
            "Tomorrow", "Monday, Mar 9", "Tuesday, Mar 10",
        ]);
        expect(addForm().queryByRole("button", { name: /^(Today|Tomorrow)$/ })).toBeNull();
    });

    it("mutes only weekends with no open tasks and keeps them selectable", () => {
        render(<Notes />);
        const saturday = screen.getByRole("button", { name: /Saturday.*0 open tasks/ });
        const sunday = screen.getByRole("button", { name: /Sunday.*0 open tasks/ });
        const monday = screen.getByRole("button", { name: /Monday.*0 open tasks/ });
        expect(saturday.dataset.emptyWeekend).toBe("true");
        expect(sunday.dataset.emptyWeekend).toBe("true");
        expect(monday.dataset.emptyWeekend).toBeUndefined();

        fireEvent.click(sunday);
        expect(sunday.getAttribute("aria-pressed")).toBe("true");
        addTask("Sunday homework", (form) => setDueDate(form, "2026-03-08"));
        expect(screen.getByRole("button", { name: /Sunday.*1 open task/ }).dataset.emptyWeekend).toBeUndefined();
        fireEvent.click(screen.getByRole("checkbox", { name: "Complete Sunday homework" }));
        expect(screen.getByRole("button", { name: /Sunday.*0 open tasks/ }).dataset.emptyWeekend).toBe("true");
    });

    it("validates a whole backup before replacement and restores mixed generations of tasks", async () => {
        const newTask = {
            ...legacyTask,
            id: "recent",
            name: "Chemistry revision",
            subject: "Chemistry",
            details: "Chapters four and five",
            completedAt: "2026-03-06T11:00:00.000Z",
        };
        localStorage.setItem("notes", JSON.stringify([legacyTask, newTask]));
        render(<Notes />);
        const backupMenu = screen.getByRole("button", { name: "Task options" });
        expect(screen.queryByRole("button", { name: "Export tasks" })).toBeNull();
        fireEvent.click(backupMenu);
        expect(screen.getByRole("button", { name: "Export tasks" })).toBeTruthy();
        fireEvent.keyDown(screen.getByRole("button", { name: "Restore tasks" }), { key: "Escape" });
        expect(backupMenu.getAttribute("aria-expanded")).toBe("false");
        expect(document.activeElement).toBe(backupMenu);
        const backup = useNotesStore.getState().exportTasks();
        expect(parseTaskBackup(backup)).toMatchObject([legacyTask, newTask]);

        chooseBackup(JSON.stringify({ version: 1, notes: [legacyTask, { ...newTask, date: "2026-02-30" }] }));
        expect(await screen.findByRole("alert")).toHaveProperty("textContent", "Couldn’t open this file. Choose a valid productIVE task backup.");
        expect(screen.queryByRole("dialog")).toBeNull();
        expect(storedTasks()).toEqual([legacyTask, newTask]);

        addTask("Another task");
        chooseBackup(backup);
        const dialog = await screen.findByRole("dialog", { name: "Restore tasks?" });
        expect(within(dialog).getByText(/contains 2 tasks/)).toBeTruthy();
        expect(storedTasks()).toHaveLength(3);
        fireEvent.click(within(dialog).getByRole("button", { name: "Replace tasks" }));
        expect(storedTasks()).toMatchObject([legacyTask, newTask]);
        expect(screen.queryByRole("checkbox", { name: "Complete Another task" })).toBeNull();
    });

    it("preserves the quick-add draft and saved tasks when browser writes fail", () => {
        localStorage.setItem("notes", JSON.stringify([legacyTask]));
        render(<Notes />);
        vi.spyOn(Storage.prototype, "setItem").mockImplementationOnce(() => { throw new Error("Quota exceeded"); });
        addTask("Keep this draft");
        expect(screen.getByRole("alert").textContent).toContain("Couldn’t save tasks");
        expect(addForm().getByRole("textbox", { name: "Task title" }).value).toBe("Keep this draft");
        expect(storedTasks()).toEqual([legacyTask]);

        fireEvent.click(addForm().getByRole("button", { name: "Add task" }));
        expect(screen.getByRole("checkbox", { name: "Complete Keep this draft" })).toBeTruthy();
    });

    it("rolls Today into Overdue at local midnight while the page stays open", () => {
        vi.useRealTimers();
        vi.useFakeTimers();
        vi.setSystemTime(new Date(2026, 2, 7, 23, 59, 30));
        localStorage.setItem("notes", JSON.stringify([{ ...legacyTask, date: "2026-03-07" }]));
        render(<Notes />);
        expect(screen.getByRole("heading", { name: /Today/ })).toBeTruthy();

        act(() => vi.advanceTimersByTime(31_000));
        expect(screen.getByRole("heading", { name: /Overdue/ })).toBeTruthy();
        expect(screen.getByRole("button", { name: /Today, Sunday.*0 open tasks/ })).toBeTruthy();
    });
});

it("keeps date-only deadlines on the selected day across the daylight-saving weekend", () => {
    const lateMarch7 = new Date(2026, 2, 7, 23, 50);
    expect(localDateKey(lateMarch7)).toBe("2026-03-07");
    expect(addCalendarDays(localDateKey(lateMarch7), 2)).toBe("2026-03-09");
    expect(deadlineLabel("2026-03-08", "2026-03-07")).toContain("Sunday");
});
