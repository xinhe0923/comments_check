import React, { useEffect, useState } from "react";
import { Posts } from "./Posts";

export const Users = () => {
  const [posts, setPosts] = useState();
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState();

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
    setSelected(e.target.value);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        setPosts(json.filter((post) => post.userId == e.target.value));
        setLoading(false);
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
      <Posts posts={posts} />
    </div>
  );
};
