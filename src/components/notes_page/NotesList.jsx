import { useEffect, useState } from "react";
import FilterPanel from "./FilterPanel";
import { useNotesStore } from "../../notesStore";
import SingleNoteLine from "./SingleNoteLine";

const NotesList = () => {
    const { notes, initializeNotes, sortMethod, searchQuery } = useNotesStore();
    const [dates, setDates] = useState([]);

    // Initializing notes
    useEffect(() => {
        initializeNotes();
    }, []);

    const filterNotes = (date) => {
        const newNotes = notes.filter((el) => el.date === date);
        return newNotes;
    };

    useEffect(() => {
        let filteredDates = [...new Set(notes.map((note) => note.date))];

        switch (sortMethod) {
            case "Date (A to Z)":
                filteredDates.sort((a, b) => new Date(a) - new Date(b));
                setDates(filteredDates);
                break;

            case "Date (Z to A)":
                filteredDates.sort((a, b) => new Date(b) - new Date(a));
                setDates(filteredDates);
                break;
            case "Newest":
                setDates(filteredDates.reverse());
                break;
            case "Oldest":
                setDates(filteredDates);
                break;
        }
    }, [sortMethod, notes]);

    return (
        <div className="mb-[80px] max-sm:mb-[160px]">
            <FilterPanel />

            {/* single note */}
            {notes.length > 0 ? (
                dates.map((date) => {
                    const newDate = new Date(date);
                    const weekDayOptions = { weekday: "long" };
                    const monthOptions = { month: "long" };
                    const weekDay = newDate.toLocaleDateString(
                        "en-US",
                        weekDayOptions
                    );
                    const monthName = newDate.toLocaleDateString(
                        "en-US",
                        monthOptions
                    );
                    const dayNumber = newDate.getDate();

                    // If sort method is equal "Importance" then do not display this block with date, in opposite it will be empty
                    if (
                        sortMethod === "Importance" &&
                        filterNotes(date).filter((el) => el.priority.important)
                            .length < 1
                    ) {
                        return;
                    }

                    // Hide if sort method is "Currency"
                    if (
                        sortMethod === "Currency" &&
                        filterNotes(date).filter((el) => el.priority.currency)
                            .length < 1
                    ) {
                        return;
                    }

                    // Hide if sort method is "Without date"
                    if (sortMethod === "Without date" && date) {
                        return;
                    }

                    // Hide if doesnt match search query
                    const filteredNotes = filterNotes(date).filter((note) => {
                        if (!searchQuery) return true; // If there's no search query, show all notes

                        const searchArr = searchQuery
                            .trim()
                            .toLowerCase()
                            .split(/\s+/);
                        return searchArr.every(
                            (term) =>
                                String(dayNumber).includes(term) ||
                                weekDay.toLowerCase().includes(term) ||
                                monthName.toLowerCase().includes(term) ||
                                note.name.toLowerCase().includes(term)
                        );
                    });

                    const checkDate = () => {
                        const currentDate = new Date();
                        const startOfYear = new Date(
                            currentDate.getFullYear(),
                            0,
                            1
                        );

                        const diff = currentDate - startOfYear;
                        const noteDiff = newDate - startOfYear;

                        const dayOfYear = diff / (1000 * 60 * 60 * 24);
                        const noteDayOfYear = noteDiff / (1000 * 60 * 60 * 24);

                        const dateDifference =
                            Math.floor(noteDayOfYear) - Math.floor(dayOfYear);

                        if (dateDifference < 0) {
                            return (
                                <div className="flex-center sm:ml-10 bg-bgNote bg-opacity-75 text-gray-400 border border-mainLineColor px-2 py-1 rounded-md max-sm:rounded-sm text-sm max-sm:text-[.8rem]">
                                    Done
                                </div>
                            );
                        } else if (dateDifference === 0) {
                            return (
                                <div className="flex-center sm:ml-10 bg-todayNoteColor bg-opacity-75 xl:shadow-main text-white px-3 py-1 rounded-md max-sm:rounded-sm text-sm max-sm:text-[.8rem]">
                                    Today
                                </div>
                            );
                        } else if (dateDifference === 1) {
                            return (
                                <div className="flex-center sm:ml-10 bg-red-500 bg-opacity-75 xl:shadow-main text-white px-2 py-1 rounded-md max-sm:rounded-sm text-sm max-sm:text-[.8rem]">
                                    Tommorow
                                </div>
                            );
                        } else if (dateDifference <= 7 && dateDifference > 1) {
                            return (
                                <div className="flex-center sm:ml-10 max-sm:ml-0 bg-yellow-500 bg-opacity-75 xl:shadow-main text-white px-2 py-1 rounded-md max-sm:rounded-sm text-sm max-sm:text-[.8rem]">
                                    This week
                                </div>
                            );
                        }
                    };

                    // Hide if block is empty
                    if (filteredNotes.length === 0) return null;

                    return (
                        <div key={date} className="mt-9 mb-12">
                            <div className="flex items-center mx-10 max-sm:mx-5 mb-3 max-sm:justify-between">
                                <h1 className="text-xl font-semibold text-mainColor">
                                    {date !== "" ? (
                                        <>
                                            {weekDay}, {dayNumber} {monthName}
                                        </>
                                    ) : (
                                        "Notes without date"
                                    )}
                                </h1>

                                {checkDate()}
                            </div>

                            <div className="border-y-[1px] border-mainLineColor divide-y-[1px] divide-notesDivide">
                                {filteredNotes.map((note) => (
                                    <SingleNoteLine
                                        key={note.id}
                                        note={note}
                                        sortMethod={sortMethod}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })
            ) : (
                <h1 className="text-3xl text-center mt-5 text-mainDullColor font-light">
                    Nothing here yet.
                </h1>
            )}
        </div>
    );
};

export default NotesList;
