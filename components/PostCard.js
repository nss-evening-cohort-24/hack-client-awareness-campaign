/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
// import Link from 'next/link';
import { Card } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

export default function PostCard({ postObj }) {
  const { user } = useAuth();

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={postObj.image} alt={postObj.name} style={{ height: '450px' }} />
      <Card.Body>
        <Card.Title>{postObj.name}</Card.Title>
        {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
        <p>{postObj.description}</p>
        {user.uid === postObj.uid ? 'you can delete this' : 'you cannot delete this'}
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
};
