/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
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

const cleanCircularReferences = (obj) => {
  const seen = new Map();

  const clean = (data) => {
    if (!data || typeof data !== 'object') {
      return data;
    }

    if (seen.has(data)) {
      return null; // Break circular references
    }

    seen.set(data, true);

    if (Array.isArray(data)) {
      return data.map(clean);
    }

    const cleanedData = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = clean(data[key]);
        if (value !== null) {
          cleanedData[key] = value;
        }
      }
    }
    return cleanedData;
  };

  return clean(obj);
};

const fetchPostWithCategories = async (postId) => {
  try {
    const response = await fetch(`/postwithcategories/${postId}`); // Replace with your actual endpoint URL
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();
    const cleanedData = cleanCircularReferences(data); // Function to clean circular references and null values

    return cleanedData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export {
  associateCategoryWithPost,
  dissociateCategoryFromPost,
  fetchPostWithCategories,
  cleanCircularReferences,
};
