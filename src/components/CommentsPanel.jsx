import { useRef, useState } from "react";
import CommentsList from "./CommentsList";
import { useTimeRangeStore } from "../store";

const CommentsPanel = () => {
    const { isCommentPanelOpen, addComment } = useTimeRangeStore();
    const inputRef = useRef(null);

    const [comment, setComment] = useState({
        text: "",
        color: "",
    });
    const [error, setError] = useState(false);

    const handleInput = (e) => {
        const value = e.target.value;

        setComment({ ...comment, text: value });

        if (error && value.trim().length > 0) {
            setError(false);
        }

        if (inputRef.current) {
            inputRef.current.style.height = "auto";
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!comment.text) {
            return setError(true);
        }

        addComment(comment);
        setComment({
            text: "",
            color: "",
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
                {error && (
                    <div className="px-2 py-1 mb-3 bg-red-500 bg-opacity-30 rounded-sm text-mainColor border border-red-800">
                        Name is required.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="relative">
                    <textarea
                        ref={inputRef}
                        placeholder="Write comment here..."
                        className="block w-full bg-mainHoverColor text-left px-4 pt-2 rounded-md outline-none resize-none min-h-[100px] pb-10"
                        onChange={(e) => handleInput(e)}
                        value={comment.text}
                    ></textarea>

                    <div className="absolute bottom-2 flex justify-between items-center w-full px-2">
                        <input
                            type="color"
                            value={comment.color}
                            className="w-8 h-8 rounded-full border-none p-0 cursor-pointer bg-transparent"
                            onChange={(e) =>
                                setComment({
                                    ...comment,
                                    color: e.target.value,
                                })
                            }
                        />
                        <button className="bg-darkPink text-white active:bg-pink-700 px-3 py-1 rounded-md transition-all">
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CommentsPanel;
