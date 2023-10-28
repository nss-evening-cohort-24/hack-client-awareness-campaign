import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

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

export {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
