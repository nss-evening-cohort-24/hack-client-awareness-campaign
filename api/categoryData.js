/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
// import { clientCredentials } from '../utils/client';

const dbUrl = 'https://localhost:7136';

const createCategory = async (categoryData) => {
  try {
    const response = await fetch(`${dbUrl}/api/category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });

    if (!response.ok) {
      throw new Error('Error creating category');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error creating category: ${error.message}`);
  }
};

const getAllCategories = async () => {
  try {
    const response = await fetch(`${dbUrl}/api/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching categories');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching categories: ${error.message}`);
  }
};

const getCategoryById = async (id) => {
  try {
    const response = await fetch(`${dbUrl}/api/categories/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching category');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching category: ${error.message}`);
  }
};

const updateCategory = async (id, updatedCategoryData) => {
  try {
    const response = await fetch(`${dbUrl}/api/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCategoryData),
    });

    if (!response.ok) {
      throw new Error('Error updating category');
    }

    return 'Category updated successfully';
  } catch (error) {
    throw new Error(`Error updating category: ${error.message}`);
  }
};

const deleteCategory = async (id) => {
  try {
    const response = await fetch(`${dbUrl}/api/categories/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error deleting category');
    }

    return 'Category deleted successfully';
  } catch (error) {
    throw new Error(`Error deleting category: ${error.message}`);
  }
};

const fetchPostWithCategories = async (postId) => {
  try {
    const response = await fetch(`${dbUrl}/postwithcategories/${postId}`); // Replace with your actual endpoint URL
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  fetchPostWithCategories,
};
