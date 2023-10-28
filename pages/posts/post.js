/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { getAllPosts } from '../../api/postData';
import PostCard from '../../components/PostCard';

export default function Posts() {
  const [posts, setPosts] = useState([]);

  const getThePosts = () => {
    getAllPosts().then(setPosts);
  };

  useEffect(() => {
    getThePosts();
  }, []);

  return (
    <div>
      <div className="text-center my-4">
        <h1> POSTS </h1>
        <div className="d-flex flex-wrap">
          {posts.map((post) => <PostCard postObj={post} key={post.id} onUpdate={getThePosts} />)}
        </div>
      </div>
    </div>
  );
}
