import { useRef, useState } from "react";
import CommentsList from "./CommentsList";

const CommentsPanel = () => {
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
    };

    return (
        <div className="absolute w-[300px] h-[calc(100vh-68px)] right-0 top-full bg-mainBackground border-l border-mainLineColor px-4">
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
