import { useState } from "react";
import NoteContext from "./NoteContext";

import { HiOutlineDotsVertical } from "react-icons/hi";
import { PiExclamationMarkBold } from "react-icons/pi";
import { TbCurrencyDollar } from "react-icons/tb";
import { useNotesStore } from "../../notesStore";

const SingleNoteLine = ({ note, sortMethod }) => {
    const { setEditingNote } = useNotesStore();
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
                    ? "bg-redBgNote"
                    : note.priority.currency
                    ? "bg-greenBgNote"
                    : "bg-bgNote"
            } px-5 pr-0 flex justify-between relative min-h-[40.8px]`}
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

                <h2 className="flex items-center w-full text-mainColor">
                    {note.name}
                </h2>
            </div>

            <div
                className={`flex items-center relative transition-all min-h-full  ${
                    isContextOpen
                        ? "right-0"
                        : "-right-[112px] max-sm:-right-[96px]"
                }`}
            >
                <button
                    className="mr-3 xl:mr-4 p-1 text-mainColor"
                    onClick={openContext}
                >
                    <HiOutlineDotsVertical />
                </button>

                {/* context */}
                <NoteContext note={note} setIsContextOpen={setIsContextOpen} />
            </div>
        </div>
    );
};

export default SingleNoteLine;
