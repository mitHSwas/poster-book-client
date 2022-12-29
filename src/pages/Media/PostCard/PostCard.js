import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = (props) => {
    const { _id, post, postImg } = props.post;
    return (
        <div className="card card-compact mx-auto w-96 bg-base-100 shadow-xl">
            <figure><img src={postImg} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">Post:</h2>
                <p>{post}</p>
                <div className="card-actions justify-end">
                    <Link to={`/postDetails/${_id}`} className="btn btn-active btn-ghost">Comments</Link>
                    <Link to={`/postDetails/${_id}`} className="btn btn-primary">Details</Link>
                </div>
            </div>
        </div>
    );
};

export default PostCard;