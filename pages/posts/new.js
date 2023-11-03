import React, { useEffect, useState } from 'react';
import PostForm from '../../components/forms/PostForm';
import { getUserIdFromUid } from '../../api/userData';
import { useAuth } from '../../utils/context/authContext';

export default function CreatePost() {
  const { user } = useAuth();
  const [userId, setUserId] = useState(0);

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
    getUserId();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return <PostForm userIdent={userId} />;
}
