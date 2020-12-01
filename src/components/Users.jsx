import React, { useEffect, useState } from "react";

export const Users = () => {
  const [users, setUsers] = useState();
  const [posts, setPosts] = useState();
  const [more, setMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState();
  const [comments, setComments] = useState();
  const [selectpost, setSelectpost] = useState();
  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        setUsers(json);
        setLoading(false);
      });
  }, []);

  const fetchPosts = (e) => {
    setLoading(true);
    setMore(false);
    setSelected(e.target.value);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        setPosts(json.filter((post) => post.userId == e.target.value));
        setLoading(false);
      });
  };
  const fetchComments = (e) => {
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
    <div>
      <h1>Please select a user to find their comments:</h1>
      {users
        ? users.map((user) => (
            <button
              className="user-button"
              key={user.id}
              value={user.id}
              onClick={(e) => fetchPosts(e)}
              style={{
                background:
                  selected === user.id ? "rgb(144, 144, 197)" : "none",
              }}
            >
              {user.name.split(" ")[1]}
            </button>
          ))
        : loading && <div>loading</div>}
      {posts ? (
        <table className="posts-table">
          <tbody>
            {posts.slice(0, 3).map((post) => (
              <tr className="post-tr" key={post.id}>
                <th>
                  <h3>{post.title}</h3>
                  <div> {post.body}</div>
                  {!!comments &&
                    selectpost == post.id &&
                    comments.map((comment) => {
                      <div className="comment">{comment.body}</div>;
                    })}
                  {comments && comments[0].name}
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
            ))}
            {more &&
              posts.slice(3).map((post) => (
                <tr key={post.id}>
                  <th>
                    <h3>{post.title}</h3>
                    {post.body}
                  </th>
                </tr>
              ))}
            {!more && (
              <tr>
                <td>
                  <button onClick={() => setMore(true)}>more</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        loading && <div>loading</div>
      )}
    </div>
  );
};
