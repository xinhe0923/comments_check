import React from "react";

export const Comments = ({ comments }) => {
  return comments.map((comment) => {
    return (
      <div className="comment" key={comment.id}>
        <div>Id: {comment.id}</div>
        <div style={{ fontWeight: "bold" }}>title: {comment.name}</div>
        <div style={{ fontStyle: "italic" }}>body: {comment.body}</div>
      </div>
    );
  });
};
