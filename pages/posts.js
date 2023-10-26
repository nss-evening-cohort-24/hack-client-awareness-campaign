import React, { useState, useEffect } from 'react';
import { getPosts } from '../api/fbPostData';
import { useAuth } from '../utils/context/authContext';
import PostCard from '../components/PostCard';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  const getThePosts = () => {
    getPosts(user.uid).then(setPosts);
  };

  useEffect(() => {
    getThePosts();
  }, []);

  return (
    <div>
      <div className="text-center my-4">
        <h1> Posts </h1>
        <div className="d-flex flex-wrap">
          {posts.map((post) => <PostCard postObj={post} key={post.firebaseKey} />)}
        </div>
      </div>
    </div>
  );
}
