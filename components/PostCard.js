/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { deletePost } from '../api/fbPostData';

export default function PostCard({ postObj, onUpdate }) {
  const { user } = useAuth();

  const deleteThisPost = () => {
    if (window.confirm(`Delete ${postObj.postName}?`)) {
      deletePost(postObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <div className="card">
      <p className="card-title">{postObj.postName}</p>
      <p className="small-desc">
        {postObj.description}
      </p>
      <div className="buttons">{user.uid === postObj.uid ? (
        <>
          <Link href={`/posts/edit/${postObj.firebaseKey}`} passHref>
            <Button variant="info">EDIT</Button>
          </Link>
          <Button variant="danger" onClick={deleteThisPost} className="m-2">
            DELETE
          </Button>
        </>
      ) : ''}
      </div>
      <div className="go-corner">
        <div className="go-arrow">→</div>
      </div>
    </div>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
    image: PropTypes.string,
    postName: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
