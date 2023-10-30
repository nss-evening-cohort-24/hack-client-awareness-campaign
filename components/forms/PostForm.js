import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPost, updatePost } from '../../api/postData';
import { associateCategoryWithPost } from '../../api/categoryPostData';
import { getAllCategories } from '../../api/categoryData';

const initialState = {
  postName: '',
  description: '',
};

function PostForm({ obj, userIdent }) {
  const [formInput, setFormInput] = useState(initialState);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) setFormInput(obj);
  }, [obj, user]);

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

  const handleCategorySelection = (e) => {
    // Handle category selection, e.g., update selectedCategories state
    const categoryId = parseInt(e.target.value, 10);
    // Ensure you get the category ID as an integer
    if (e.target.checked) {
      setSelectedCategories((prevCategories) => [...prevCategories, categoryId]);
    } else {
      setSelectedCategories((prevCategories) => prevCategories.filter((id) => id !== categoryId));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formInput,
      userId: userIdent,
    };

    if (obj.id) {
      // This is an existing post, so update it
      updatePost(payload).then(() => router.push('/posts/post'));
    } else if (userIdent !== undefined) {
      // This is a new post, so create it
      createPost(payload)
        .then((response) => {
          console.log(response); // Log the response here to inspect its structure
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
  }),
  userIdent: PropTypes.number.isRequired,
};

PostForm.defaultProps = {
  obj: initialState,
};

export default PostForm;
