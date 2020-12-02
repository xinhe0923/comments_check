import React, { useEffect, useState } from "react";
import { Post } from "./Post";

export const Posts = ({ posts }) => {
  //   const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(false);
  const [more, setMore] = useState(false);
  useEffect(() => setMore(false), [posts]);

  return (
    <div>
      {posts ? (
        <table className="posts-table">
          <tbody>
            {posts.slice(0, 3).map((post) => (
              <Post post={post} key={post.id} />
            ))}

            {more &&
              posts.slice(3).map((post) => <Post post={post} key={post.id} />)}
          </tbody>
        </table>
      ) : (
        loading && <div>loading</div>
      )}
      {!more && posts && (
        <div>
          <div>
            <button onClick={() => setMore(true)}>more</button>
          </div>
        </div>
      )}
    </div>
  );
};
