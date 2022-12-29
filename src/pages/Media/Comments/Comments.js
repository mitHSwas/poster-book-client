import React from 'react';

const Comments = (props) => {
    const { comment } = props.comment;
    return (
        <div>
            {comment}
        </div>
    );
};

export default Comments;