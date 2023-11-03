import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../../api/postData';
import PostForm from '../../../components/forms/PostForm';
import { useAuth } from '../../../utils/context/authContext';
import { getUserIdFromUid } from '../../../api/userData';

export default function EditPost() {
  const [editPost, setPost] = useState({});
  const [userId, setUserId] = useState(0);
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  const getUserId = () => {
    getUserIdFromUid(user.uid)?.then((data) => {
      // Check if data exists and has an 'id' property, then set userId
      if (data && data.id) {
        setUserId(data.id);
      } else {
        // If data doesn't contain 'id', set userId to 0
        setUserId(0);
      }
    });
  };

  useEffect(() => {
    getSinglePost(id).then(setPost);
  }, [id]);

  useEffect(() => {
    getUserId();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <PostForm obj={editPost} userIdent={userId} postID={id} />
  );
}
