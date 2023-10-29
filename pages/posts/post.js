/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { getAllPosts } from '../../api/postData';
import PostCard from '../../components/PostCard';
import { useAuth } from '../../utils/context/authContext';
import { getUserIdFromUid } from '../../api/userData';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  const getThePosts = () => {
    getAllPosts().then(setPosts);
  };

  const [userId, setUserId] = useState(0);

  const getUserUid = () => {
    getUserIdFromUid(user.uid).then(setUserId);
  };

  useEffect(() => {
    getThePosts();
    getUserUid();
  }, []);

  return (
    <div>
      <div className="text-center my-4">
        <h1> POSTS </h1>
        <div className="d-flex flex-wrap">
          {posts.map((post) => <PostCard postObj={post} key={post.id} onUpdate={getThePosts} userIdent={userId.id} />)}
        </div>
      </div>
    </div>
  );
}
