const getAllUsers = async () => {
  try {
    const response = await fetch('/users', {
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
    const response = await fetch(`/api/users/${id}`, {
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
