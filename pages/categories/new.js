import React, { useEffect, useState } from 'react';
import CategoryForm from '../../components/forms/CategoryForm';
import { getUserById } from '../../api/userData';
import { useAuth } from '../../utils/context/authContext';

export default function CreateCategory() {
  const { user } = useAuth();
  const [userId, setUserId] = useState(0);

  const getUserId = () => {
    getUserById(user.uid)?.then(setUserId);
  };
  useEffect(() => {
    getUserId();
  }, [user]);
  return <CategoryForm userIdent={userId} />;
}
