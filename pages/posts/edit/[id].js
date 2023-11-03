import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../../api/postData';
import PostForm from '../../../components/forms/PostForm';

export default function EditPost() {
  const [editPost, setPost] = useState({});
  const router = useRouter();
  const { id } = router.query;

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
}
