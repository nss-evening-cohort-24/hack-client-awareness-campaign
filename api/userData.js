// import { clientCredentials } from '../utils/client';

const dbUrl = 'https://localhost:7136';

const getAllUsers = async () => {
  try {
    const response = await fetch('https://localhost:7136/users', {
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

const getUserIdFromUid = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/uservalidate/${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

export {
  getAllUsers,
  getUserById,
  getUserIdFromUid,
};
