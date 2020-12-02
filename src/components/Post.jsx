import React, { useEffect, useState } from "react";
import { Comments } from "./Comments";

export const Post = ({ post }) => {
  const [comments, setComments] = useState();
  const [show, setShow] = useState(false);
  const [selectpost, setSelectpost] = useState();
  useEffect(() => setComments(), [post]);

  const fetchComments = (e) => {
    setShow(!show);
    // console.log(e.target.value);
    setSelectpost(e.target.value);
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((response) => response.json())
      .then((json) => {
        setComments(
          json.filter((comment) => {
            return comment.postId == e.target.value;
          })
        );
        // console.log(comments);
      });
  };
  return (
    <tr className="post-tr" key={post.id}>
      <th>
        <h3>{post.title}</h3>
        <div> {post.body}</div>
        {comments && show && <Comments comments={comments} />}
      </th>
      <th>
        <button
          value={post.id}
          className="comment-button"
          onClick={(e) => fetchComments(e)}
        >
          comments
        </button>
      </th>
    </tr>
  );
};
