/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { deletePost } from '../api/postData';
import { fetchPostWithCategories } from '../api/categoryData';

export default function PostCard({ postObj, onUpdate, userIdent }) {
  const deleteThisPost = () => {
    if (window.confirm(`Delete ${postObj.postName}?`)) {
      deletePost(postObj.id).then(() => onUpdate());
    }
  };

  // Getting categories
  const [getCat, setCat] = useState('');

  // fetchPostWithCategories(postObj.id).then(setCat);

  const getTheCategories = () => fetchPostWithCategories(postObj.id).then(setCat);

  useEffect(() => {
    getTheCategories();
  }, [postObj]);

  console.warn(getCat);

  return (
    <div className="card">
      <p className="card-title">{postObj.postName}</p>
      {getCat.categories.map((cat) => <p className="small-dec"> {cat.categoryName} </p>)}
      <p className="small-desc">
        {postObj.description}
      </p>
      <div className="buttons">{userIdent === postObj.userId ? (
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
    id: PropTypes.number.isRequired,
    userId: PropTypes.number,
    image: PropTypes.string,
    postName: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  userIdent: PropTypes.number.isRequired,
};
