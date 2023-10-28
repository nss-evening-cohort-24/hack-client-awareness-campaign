import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../../api/fbPostData';
import PostForm from '../../../components/forms/PostForm';

export default function EditPost() {
  const [editPost, setPost] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  console.warn(editPost);

  useEffect(() => {
    getSinglePost(firebaseKey).then(setPost);
  }, [firebaseKey]);

  return (
    <PostForm obj={editPost} />
  );
}
