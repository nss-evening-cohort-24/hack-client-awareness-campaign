import React, { useEffect, useState } from 'react';
import PostForm from '../../components/forms/PostForm';
import { getUserById } from '../../api/userData';
import { useAuth } from '../../utils/context/authContext';

export default function CreatePost() {
  const { user } = useAuth();
  const [userId, setUserId] = useState(0);

  const getUserId = () => {
    getUserById(user.uid)?.then(setUserId);
  };
  useEffect(() => {
    getUserId();
  }, [user]);
  return <PostForm userIdent={userId} />;
}
