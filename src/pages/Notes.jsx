import { useEffect, useRef } from "react";
import Controller from "../components/notes_page/Controller";
import HandleMainBar from "../components/notes_page/HandleMainBar";
import NotesList from "../components/notes_page/NotesList";
import { useNotesStore } from "../notesStore";

const Notes = () => {
    const { setNotesRef } = useNotesStore();
    const notesRef = useRef(null);

    useEffect(() => {
        setNotesRef(notesRef);
    }, []);

    return (
        <div
            ref={notesRef}
            className="h-[calc(100vh-68px)] bg-contain sm:pl-16 overflow-auto overflow-x-hidden bg-mainBackground"
        >
            <HandleMainBar />
            <NotesList />
            <Controller />
        </div>
    );
};

export default Notes;
