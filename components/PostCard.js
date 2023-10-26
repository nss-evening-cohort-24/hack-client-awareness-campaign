/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';

export default function PostCard({ postObj }) {
  const { user } = useAuth();

  return (
    <>
      <div className="card">
        <div className="card-image"> <img src={postObj.image} /> </div>
        <div className="category"> {postObj.name} </div>
        <div className="heading"> {postObj.description}
          <div className="author"> {user.uid === postObj.uid ? 'you can delete' : 'you cannot delete'} </div>
        </div>
      </div>
    </>
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
