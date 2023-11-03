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

    console.log('Category associated with post successfully.');

    return data;
  } catch (error) {
    throw new Error(`Error associating category with post: ${error.message}`);
  }
};

const dissociateCategoryFromPost = async (postId, categoryId) => {
  try {
    const response = await fetch(`${dbUrl}/api/CategoryPost?postId=${postId}&categoryId=${categoryId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error dissociating category from post');
    }

    const data = await response.json();

    console.log('Category dissociated from post successfully.');

    return data;
  } catch (error) {
    throw new Error(`Error dissociating category from post: ${error.message}`);
  }
};

async function fetchAssociatedCategoriesForPost(postId) {
  try {
    const response = await fetch(`${dbUrl}/api/posts/${postId}/categories`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    throw new Error(`Error fetching associated categories: ${error.message}`);
  }
}

export {
  associateCategoryWithPost,
  dissociateCategoryFromPost,
  fetchAssociatedCategoriesForPost,
};
