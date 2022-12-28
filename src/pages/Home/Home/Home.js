import React from 'react';
import AddPost from '../AddPost/AddPost';
import ShowPost from '../ShowPost/ShowPost';

const Home = () => {
    return (
        <div>
            <AddPost></AddPost>
            <ShowPost></ShowPost>
        </div>
    );
};

export default Home;