import { useEffect, useRef, useState } from "react";

import { RiDraggable } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { useTimeRangeStore } from "../store";

const SingleComment = ({ comment }) => {
    const { deleteComment } = useTimeRangeStore();
    const [isContext, setIsContext] = useState(false);

    const commentRef = useRef(null);
    const date = new Date();

    const openContext = () => {};

    useEffect(() => {
        const checkClick = (e) => {
            if (commentRef) {
                if (!commentRef.current.contains(e.target)) {
                    setIsContext(false);
                } else setIsContext(true);
            }
        };

        document.addEventListener("click", checkClick);

        return () => {
            return removeEventListener("click", checkClick);
        };
    }, []);

    return (
        <li
            ref={commentRef}
            draggable
            className="cursor-grab"
            onClick={openContext}
        >
            {isContext && (
                <p className="text-[.7rem] text-gray-500 mb-1">
                    {comment.date}
                </p>
            )}
            <div
                className="bg-mainDullColor flex mr-5 rounded-sm px-2 py-1"
                style={{
                    backgroundColor: comment.color,
                }}
            >
                <div className="flex items-center justify-between w-full">
                    <p className="overflow-hidden">{comment.text}</p>

                    <button className="cursor-grab">
                        <RiDraggable />
                    </button>
                </div>

                <div className="absolute right-0 flex items-start pt-1">
                    <button onClick={() => deleteComment(comment.id)}>
                        <IoMdClose />
                    </button>
                </div>
            </div>
        </li>
    );
};

export default SingleComment;
