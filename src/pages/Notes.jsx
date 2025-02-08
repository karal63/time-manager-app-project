import Controller from "../components/notes_page/Controller";
import HandleMainBar from "../components/notes_page/HandleMainBar";
import NotesList from "../components/notes_page/NotesList";

const Notes = () => {
    return (
        <div className="h-[calc(100vh-68px)] bg-contain sm:pl-16 overflow-auto overflow-x-hidden">
            <HandleMainBar />
            <NotesList />
            <Controller />
        </div>
    );
};

export default Notes;
