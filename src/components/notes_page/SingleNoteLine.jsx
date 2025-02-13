import { useState } from "react";
import NoteContext from "./NoteContext";

import { HiOutlineDotsVertical } from "react-icons/hi";
import { PiExclamationMarkBold } from "react-icons/pi";
import { TbCurrencyDollar } from "react-icons/tb";
import { useNotesStore } from "../../notesStore";

const SingleNoteLine = ({ note, sortMethod }) => {
    const { setEditingNote, searchQuery } = useNotesStore();
    const [isContextOpen, setIsContextOpen] = useState(false);

    const openContext = () => {
        setIsContextOpen(!isContextOpen);
        setEditingNote(false, {});
    };

    if (sortMethod === "Importance" && !note.priority.important) {
        return;
    }

    if (sortMethod === "Currency" && !note.priority.currency) {
        return;
    }

    return (
        <div
            key={note.id}
            className={`${
                note.priority.important
                    ? "bg-red-50"
                    : note.priority.currency
                    ? "bg-green-50"
                    : "bg-gray-100"
            } px-5 pr-0 border-b-[1px] flex justify-between relative min-h-[40.8px]`}
        >
            <div className="flex items-center">
                {/* If important */}
                {note.priority.important && (
                    <span className="text-2xl text-darkPink w-[30px]">
                        <PiExclamationMarkBold />
                    </span>
                )}

                {/* If currency */}
                {note.priority.currency && (
                    <span className="text-2xl text-darkPink w-[30px]">
                        <TbCurrencyDollar />
                    </span>
                )}

                <h2 className="flex items-center w-full">{note.name}</h2>
            </div>

            <div
                className={`flex items-center relative transition-all max-h-max ${
                    isContextOpen
                        ? "right-0"
                        : "-right-[112px] max-sm:-right-[96px]"
                }`}
            >
                <button className="mr-3 xl:mr-4 p-1" onClick={openContext}>
                    <HiOutlineDotsVertical />
                </button>

                {/* context */}
                <NoteContext note={note} setIsContextOpen={setIsContextOpen} />
            </div>
        </div>
    );
};

export default SingleNoteLine;
