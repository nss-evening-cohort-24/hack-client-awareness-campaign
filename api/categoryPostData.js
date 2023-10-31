// import { clientCredentials } from '../utils/client';

const dbUrl = 'https://localhost:7136';

const associateCategoryWithPost = async (postId, categoryId) => {
  try {
    const response = await fetch(`${dbUrl}/api/posts/${postId}/categories/${categoryId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error associating category with post');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error associating category with post: ${error.message}`);
  }
};

const dissociateCategoryFromPost = async (postId, categoryId) => {
  try {
    const response = await fetch(`${dbUrl}/api/posts/${postId}/categories/${categoryId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error dissociating category from post');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error dissociating category from post: ${error.message}`);
  }
};

export {
  associateCategoryWithPost,
  dissociateCategoryFromPost,
};
