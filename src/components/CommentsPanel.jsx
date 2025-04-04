import { useRef, useState } from "react";
import CommentsList from "./CommentsList";
import { useTimeRangeStore } from "../store";

const CommentsPanel = () => {
    const { isCommentPanelOpen, addComment } = useTimeRangeStore();

    const inputRef = useRef(null);

    const [comment, setComment] = useState({
        text: "",
    });

    const handleInput = (e) => {
        setComment({
            ...comment,
            text: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addComment(comment);
        setComment({
            ...comment,
            text: "",
        });
    };

    return (
        <div
            className={`z-20 absolute w-[300px] h-[calc(100vh-68px)] top-0 bg-mainBackground border-l border-mainLineColor px-4 ${
                isCommentPanelOpen ? "right-0" : "-right-full"
            }`}
        >
            <CommentsList />

            <div className="w-full absolute bottom-5 right-0 px-4">
                <form onSubmit={handleSubmit}>
                    <textarea
                        placeholder="Write comment here..."
                        className="block w-full bg-mainHoverColor text-left px-4 pt-2 pb-14 rounded-md outline-none resize-none"
                        onChange={(e) => handleInput(e)}
                        value={comment.text}
                    ></textarea>

                    <button className="absolute right-6 bottom-2 bg-darkPink text-white active:bg-pink-700 px-3 py-1 rounded-md transition-all">
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CommentsPanel;
