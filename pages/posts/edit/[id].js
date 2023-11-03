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
    console.log('ID Changed:', id);
    getSinglePost(id)
      .then((post) => {
        console.log('Fetched Post:', post);
        setPost(post);
      })
      .catch((error) => {
        console.error('Error fetching post:', error);
      });
  }, [id]);

  // Use conditional rendering to ensure that PostForm is only rendered when editPost has data
  return editPost.id ? <PostForm obj={editPost} /> : null;
  useEffect(() => {
    getUserId();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <PostForm obj={editPost} userIdent={userId} postID={id} />
  );
}
