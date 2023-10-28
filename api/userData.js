import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getAllUsers = async () => {
  try {
    const response = await fetch(`${dbUrl}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching users');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

const getUserById = async (id) => {
  try {
    const response = await fetch(`${dbUrl}/api/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching user');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

export {
  getAllUsers,
  getUserById,
};
