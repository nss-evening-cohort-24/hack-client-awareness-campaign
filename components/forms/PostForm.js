import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPost, updatePost } from '../../api/postData';

const initialState = {
  postName: '',
  description: '',
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
      // TODO: add route for update
      updatePost(formInput).then(() => router.push('/posts/post'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPost(payload).then(({ name }) => {
        const patchPayload = { id: name };
        updatePost(patchPayload).then(() => {
          // TODO: add route for create
          router.push('/posts/post');
        });
      });
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

      <Button type="submit" variant="outline-secondary">{obj.id ? 'Update' : 'Create'} Campaign</Button>
    </Form>
  );
}

PostForm.propTypes = {
  obj: PropTypes.shape({
    postName: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string,
  }),
};

PostForm.defaultProps = {
  obj: initialState,
};

export default PostForm;
