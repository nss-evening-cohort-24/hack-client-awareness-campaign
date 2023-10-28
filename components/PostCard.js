/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
// import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { deletePost } from '../api/fbPostData';

export default function PostCard({ postObj, onUpdate }) {
  const { user } = useAuth();

  const deleteThisPost = () => {
    if (window.confirm(`Delete ${postObj.name}?`)) {
      deletePost(postObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={postObj.image} alt={postObj.name} style={{ height: '450px' }} />
      <Card.Body>
        <Card.Title>{postObj.name}</Card.Title>
        <p>{postObj.description}</p>
        {user.uid === postObj.uid ? (
          <Button variant="danger" onClick={deleteThisPost} className="m-2">
            DELETE
          </Button>
        ) : 'you cannot delete this'}
      </Card.Body>
    </Card>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
