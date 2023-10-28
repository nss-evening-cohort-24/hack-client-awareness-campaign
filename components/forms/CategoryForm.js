import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createCategory, updateCategory } from '../../api/categoryData';

const initialState = {
  categoryName: '',
};

function PostForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateCategory(formInput).then(() => router.push('/categories/category'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createCategory(payload).then(({ name }) => {
        const patchPayload = { id: name };
        updateCategory(patchPayload).then(() => {
          router.push('/categories/category');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Category</h2>

      <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Name"
          name="categoryName"
          value={formInput.categoryName}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button type="submit" variant="outline-secondary">{obj.id ? 'Update' : 'Create'} Category</Button>
    </Form>
  );
}

PostForm.propTypes = {
  obj: PropTypes.shape({
    categoryName: PropTypes.string,
    id: PropTypes.number,
  }),
};

PostForm.defaultProps = {
  obj: initialState,
};

export default PostForm;
