import { useEffect, useState } from "react";
import FilterPanel from "./FilterPanel";
import { useNotesStore } from "../../notesStore";
import SingleNoteLine from "./SingleNoteLine";

const NotesList = () => {
    const { notes, initializeNotes, sortMethod, searchQuery } = useNotesStore();
    const [dates, setDates] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([...notes]);

    // Initializing notes
    useEffect(() => {
        initializeNotes();
        setFilteredNotes(notes);
    }, []);

    // useEffect(() => {
    //     setDates([...new Set(notes.map((note) => note.date))]);
    // }, [notes]);

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
        <div>
            <FilterPanel />

            {/* single note */}
            {dates.map((date, i) => {
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

                // Hide if block is empty
                if (filteredNotes.length === 0) return null;

                return (
                    <div key={i} className="mt-9 mb-12">
                        <h1 className="text-xl font-semibold ml-10 mb-3">
                            {date ? (
                                <>
                                    {weekDay}, {dayNumber} {monthName}
                                </>
                            ) : (
                                "Notes without date"
                            )}
                        </h1>

                        <div className="border-[1px]">
                            {filteredNotes.map((note) => (
                                <SingleNoteLine
                                    key={note.id}
                                    note={note}
                                    sortMethod={sortMethod}
                                    dayNumber={dayNumber}
                                    weekDay={weekDay}
                                    monthName={monthName}
                                />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default NotesList;
