import { useEffect, useState } from "react";
import { PiExclamationMarkBold } from "react-icons/pi";
import { CiDollar } from "react-icons/ci";
import { useNotesStore } from "../../notesStore";

const HandleMainBar = () => {
    const {
        addNote,
        isHandleBarOpen,
        editingNote,
        setEditingNote,
        editNote,
        setIsHandleBarOpen,
    } = useNotesStore();

    const [note, setNote] = useState({
        name: "",
        date: "",
        priority: {
            currency: false,
            important: false,
        },
    });

    const [validationFailed, setValidationFailed] = useState(false);

    const handleAddButton = () => {
        // Validation
        if (!note.name) {
            setValidationFailed(true);
            return;
        } else {
            setValidationFailed(false);
        }

        addNote(note);
        setNote({
            name: "",
            date: "",
            priority: {
                currency: false,
                important: false,
            },
        });
    };

    const handleEditButton = () => {
        // Validation
        if (!note.name) {
            setValidationFailed(true);
            return;
        } else {
            setValidationFailed(false);
        }

        editNote(note);
        setEditingNote(false, {});
        setNote({
            name: "",
            date: "",
            priority: {
                currency: false,
                important: false,
            },
        });
        setIsHandleBarOpen(false);
    };

    useEffect(() => {
        if (editingNote.isEditing) {
            setNote({
                ...editingNote.note,
            });
        }
    }, [editingNote.isEditing, editingNote.note]);

    useEffect(() => {
        if (!note.name) {
            setValidationFailed(true);
        } else {
            setValidationFailed(false);
        }
    }, [note]);

    if (!isHandleBarOpen) {
        return;
    }

    return (
        <div className="border-b-[1px] h-[58px] max-sm:h-[110px] flex max-sm:flex-col max-sm:items-start items-center justify-between max-sm:px-2 max-md:px-5 px-10 max-sm:py-3">
            <div className="w-full max-sm:mb-4">
                <form className="bg-gray-200">
                    <input
                        type="text"
                        placeholder="What is your task?"
                        className="outline-none text-xl w-full max-sm:px-2 pr-10"
                        value={note.name}
                        onChange={(e) =>
                            setNote({ ...note, name: e.target.value })
                        }
                    />
                </form>
            </div>

            <div className="flex justify-between items-center max-sm:w-full w-[25%]">
                <div className="flex items-center">
                    <button
                        className={`text-3xl w-10 h-10 hover:bg-gray-100 rounded-full flex-center ${
                            note.priority.currency
                                ? "text-darkPink"
                                : "text-gray-400"
                        }`}
                        onClick={() =>
                            setNote({
                                ...note,
                                priority: {
                                    ...note.priority,
                                    currency: !note.priority.currency,
                                },
                            })
                        }
                    >
                        <CiDollar />
                    </button>
                    <button
                        className={`text-3xl w-10 h-10 hover:bg-gray-100 rounded-full flex-center ${
                            note.priority.important
                                ? "text-darkPink"
                                : "text-gray-400"
                        }`}
                        onClick={() =>
                            setNote({
                                ...note,
                                priority: {
                                    ...note.priority,
                                    important: !note.priority.important,
                                },
                            })
                        }
                    >
                        <PiExclamationMarkBold />
                    </button>
                    <form>
                        <input
                            type="date"
                            name=""
                            id=""
                            className="outline-none px-4 py-2"
                            value={note.date}
                            onChange={(e) =>
                                setNote({ ...note, date: e.target.value })
                            }
                        />
                    </form>
                </div>

                <div className="bg-darkPink bg-opacity-20 hover:bg-opacity-0 px-1 py-1 rounded-md transition-all">
                    {editingNote.isEditing ? (
                        <button
                            className="max-sm:px-6 px-9 py-[3px] bg-darkPink rounded-md text-lg text-white"
                            onClick={handleEditButton}
                        >
                            Edit
                        </button>
                    ) : (
                        <button
                            className={
                                "bg-darkPink max-sm:px-6 px-9 py-[3px] rounded-md text-lg text-white"
                            }
                            onClick={handleAddButton}
                        >
                            Add
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HandleMainBar;
