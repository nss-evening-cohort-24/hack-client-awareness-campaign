/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { deletePost } from '../api/fbPostData';

export default function PostCard({ postObj, userIdent, onUpdate }) {
  const deleteThisPost = () => {
    if (window.confirm(`Delete ${postObj.postName}?`)) {
      deletePost(postObj.id).then(() => onUpdate());
    }
  };

  return (
    <div className="card">
      <p className="card-title">{postObj.postName}</p>
      <p className="small-desc">
        {postObj.description}
      </p>
      <div className="buttons">{userIdent === postObj.id ? (
        <>
          <Link href={`/posts/edit/${postObj.id}`} passHref>
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
    id: PropTypes.number,
    uid: PropTypes.string,
    image: PropTypes.string,
    postName: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  userIdent: PropTypes.number.isRequired,
};
