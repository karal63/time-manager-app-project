import { IoMdClose } from "react-icons/io";
import { useTimeRangeStore } from "../store";
import { useEffect } from "react";

const CommentsList = () => {
    const { comments, deleteComment, initializeComments } = useTimeRangeStore();

    useEffect(() => {
        initializeComments();
    }, []);

    return comments.length > 0 ? (
        <ul className="flex flex-col gap-2 mt-4">
            {comments.map((comment) => (
                <li
                    key={comment.id}
                    className="bg-mainDullColor px-2 py-1 flex justify-between rounded-sm"
                >
                    <p>{comment.text}</p>

                    <div className="flex items-start pt-1">
                        <button onClick={() => deleteComment(comment.id)}>
                            <IoMdClose />
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    ) : (
        <p className="text-center mt-3 text-gray-500">No comments yet.</p>
    );
};

export default CommentsList;
