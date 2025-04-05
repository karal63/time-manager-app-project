import { useTimeRangeStore } from "../store";
import { useEffect } from "react";
import SingleComment from "./SingleComment";

const CommentsList = () => {
    const { comments, initializeComments } = useTimeRangeStore();

    useEffect(() => {
        initializeComments();
    }, []);

    return comments.length > 0 ? (
        <ul className="flex flex-col gap-2 mt-4 relative">
            {comments.map((comment) => (
                <SingleComment key={comment.id} comment={comment} />
            ))}
        </ul>
    ) : (
        <p className="text-center mt-3 text-gray-500">No comments yet.</p>
    );
};

export default CommentsList;
