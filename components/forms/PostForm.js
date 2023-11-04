import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createPost, updatePost } from '../../api/postData';
import { associateCategoryWithPost, dissociateCategoryFromPost, fetchAssociatedCategoriesForPost } from '../../api/categoryPostData';
import { getAllCategories } from '../../api/categoryData';

const initialState = {
  postName: '',
  description: '',
  imageUrl: '',
};

function PostForm({ obj, userIdent, postID }) {
  const [formInput, setFormInput] = useState(initialState);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (obj.id) {
      setFormInput(obj);
      fetchAssociatedCategoriesForPost(obj.id)
        .then((data) => {
          const associatedCategoryIds = data.map((category) => category.id);
          setSelectedCategories(associatedCategoryIds);
        })
        .catch((error) => {
          console.error('Error fetching associated categories:', error);
        });
    }
  }, [obj]);

  useEffect(() => {
    getAllCategories()
      .then((data) => setCategories(data))
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateCategoryAssociations = (postId, updatedCategories) => {
    // This function will handle the association/dissociation logic for an existing post
    // Call it when editing an existing post
    const addCategories = updatedCategories.filter((categoryId) => !selectedCategories.includes(categoryId));
    const removeCategories = selectedCategories.filter((categoryId) => !updatedCategories.includes(categoryId));

    // Associate new categories
    Promise.all(
      addCategories.map((categoryId) => associateCategoryWithPost(postId, categoryId)),
    )
      .then(() =>
        // Dissociate categories
        // eslint-disable-next-line implicit-arrow-linebreak
        Promise.all(
          removeCategories.map((categoryId) => dissociateCategoryFromPost(postId, categoryId)),
        ))
      .then(() => {
        // Update selected categories
        setSelectedCategories(updatedCategories);
      })
      .catch((error) => {
        console.error('Error updating category associations:', error);
      });
  };

  const handleCategorySelection = (e) => {
    const categoryId = parseInt(e.target.value, 10);
    // Ensure you get the category ID as an integer
    if (e.target.checked && obj.id) {
      // Add the category to the selection
      const updatedCategories = [...selectedCategories, categoryId];
      updateCategoryAssociations(obj.id, updatedCategories);
    } else if (!e.target.checked && obj.id) {
      // Remove the category from the selection
      const updatedCategories = selectedCategories.filter((id) => id !== categoryId);
      updateCategoryAssociations(obj.id, updatedCategories);
    } else if (e.target.checked) {
      // Handle category selection for new posts
      setSelectedCategories((prevCategories) => [...prevCategories, categoryId]);
    } else {
      setSelectedCategories((prevCategories) => prevCategories.filter((id) => id !== categoryId));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (obj.id) {
      const payload = {
        ...formInput,
        userId: userIdent,
        id: postID,
      };
      updatePost(payload, Number(postID)).then(() => router.push('/posts/post'));
    } else if (userIdent !== undefined) {
      const payload = {
        ...formInput,
        userId: userIdent,
      };
      createPost(payload)
        .then((response) => {
          // Associate selected categories with the new post
          const postId = response.id; // Assuming the ID of the newly created post is returned
          return Promise.all(
            selectedCategories.map((categoryId) => associateCategoryWithPost(postId, categoryId)),
          );
        })
        .then(() => {
          // TODO: add route for create
          router.push('/posts/post');
        })
        .catch((error) => {
          // Handle error associating categories
          console.error('Error associating categories with the post:', error);
        });
    } else {
      // Handle the case where userIdent is undefined, such as displaying an error or redirecting.
      // You might also want to log this case for debugging.
      console.error('userIdent is undefined.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Campaign</h2>

      <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Name"
          name="postName"
          value={formInput.postName}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Description" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Description"
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Image URL" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Image URL"
          name="imageUrl"
          value={formInput.imageUrl}
          onChange={handleChange}
        />
      </FloatingLabel>

      <div>
        {categories.map((category) => (
          <label key={category.id}>
            <input
              type="checkbox"
              value={category.id}
              checked={selectedCategories.includes(category.id)}
              onChange={handleCategorySelection}
            />
            {category.categoryName}
          </label>
        ))}
      </div>

      <Button type="submit" variant="outline-secondary">{obj.id ? 'Update' : 'Create'} Campaign</Button>
    </Form>
  );
}

PostForm.propTypes = {
  obj: PropTypes.shape({
    postName: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    categories: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      categoryName: PropTypes.string,
    })),
  }),
  userIdent: PropTypes.number,
  postID: PropTypes.number,
};

PostForm.defaultProps = {
  obj: initialState,
  userIdent: undefined,
  postID: 0,
};

export default PostForm;
