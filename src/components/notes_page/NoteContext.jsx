import { GoPencil } from "react-icons/go";
import { BsTrash3 } from "react-icons/bs";
import { useNotesStore } from "../../notesStore";

const NoteContext = ({ note, setIsContextOpen }) => {
    const { deleteNote, setEditingNote, setIsHandleBarOpen } = useNotesStore();

    const editNote = () => {
        setIsContextOpen(false);
        setEditingNote(true, note);
        setIsHandleBarOpen(true);
    };

    return (
        <div className="flex items-center h-full">
            <button
                className="bg-orange-400 block h-full text-2xl px-4 max-sm:px-3 rounded-tl-md rounded-bl-md relative -right-1"
                onClick={editNote}
            >
                <GoPencil />
            </button>

            <button
                className="bg-red-500 block h-full text-2xl px-4 max-sm:px-3 py-2 shadow-main rounded-tl-md rounded-bl-md z-10"
                onClick={() => deleteNote(note.id)}
            >
                <BsTrash3 />
            </button>
        </div>
    );
};

export default NoteContext;
