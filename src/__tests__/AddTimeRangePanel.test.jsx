import AddTimeRangePanel from "../components/AddTimeRangePanel";

import { getByTestId, render, fireEvent, screen } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom";

import { describe, test, expect, vi } from "vitest";

import { useTimeRangeStore } from "../store";

vi.mock("../store", () => ({
    useTimeRangeStore: vi.fn(),
}));

// addTimeRange, timeRangePanel, setTimeRangePanel, editTimeRange
const mockStore = {
    addTimeRange: vi.fn(),
    timeRangePanel: vi.fn(),
    setTimeRangePanel: vi.fn(),
    editTimeRange: vi.fn(),
};
useTimeRangeStore.mockReturnValue(mockStore);

describe("AddTimeRangePanel component", () => {
    test("Header check", () => {
        const { getByTestId } = render(<AddTimeRangePanel />);
        const title = getByTestId("add-time-range-panel-title");
        expect(title).toBeInTheDocument();
    });

    test("allows user changes", () => {
        const { getByTestId } = render(<AddTimeRangePanel />);
        const nameInput = getByTestId("name-input");
        fireEvent.change(nameInput, { target: { value: "New activity" } });
        expect(nameInput.value).toBe("New activity");
    });

    test("shows error when message legth is greater then 400", () => {
        const { getByTestId } = render(<AddTimeRangePanel />);
        const descTextarea = getByTestId("desc-textarea");

        const desc = "A".repeat(401);

        fireEvent.change(descTextarea, { target: { value: desc } });
        expect(
            screen.getByText("Description cannot exceed 500 characters.")
        ).toBeInTheDocument();
    });

    test("check if submit button is disabled", () => {
        const { getByTestId } = render(<AddTimeRangePanel />);
        const submitButton = getByTestId("submit-btn");
        const nameInput = getByTestId("name-input");

        fireEvent.change(nameInput, { target: { value: "" } });
        expect(submitButton).toBeDisabled();
    });

    // test("submits the form correctly", () => {
    //     render(<AddTimeRangePanel />);

    //     const submitButton = screen.getByTestId("submit-btn");

    //     fireEvent.change(screen.getAllByRole("textbox")[0], {
    //         target: { value: "Name for test" },
    //     });
    //     fireEvent.change(screen.getAllByRole("textbox")[1], {
    //         target: { value: "07:00" },
    //     });
    //     fireEvent.change(screen.getAllByRole("textbox")[2], {
    //         target: { value: "12:00" },
    //     });

    //     expect(submitButton).not.toBeDisabled();

    //     fireEvent.click(submitButton);
    //     expect(mockStore.addTimeRange).toHaveBeenCalled();
    // });
});
