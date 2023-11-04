/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
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

  return (
    <div id="postCard" className="card">
      <p className="card-title">{postObj.postName}</p>
      <div className="cat">{getCat.categories?.map((cat) => <p className="small-dec"> {cat.categoryName} </p>)}</div>
      <p className="small-desc">
        {postObj.description}
      </p>
      <img src={postObj.imageUrl} alt={postObj.postName} width="100" height="100" />

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
    imageUrl: PropTypes.string,
    postName: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  userIdent: PropTypes.number,
};

PostCard.defaultProps = {
  userIdent: undefined,
};
