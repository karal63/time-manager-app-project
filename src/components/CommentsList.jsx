import { comment } from "postcss";
import { useState } from "react";

const CommentsList = () => {
    const [comments, setComments] = useState([
        {
            id: 1,
            text: "Hello world",
        },
        {
            id: 2,
            text: "world Hello",
        },
    ]);

    return (
        <ul>
            {comments.map((comment) => (
                <li key={comment.id}>
                    <p>{comment.text}</p>
                </li>
            ))}
        </ul>
    );
};

export default CommentsList;
