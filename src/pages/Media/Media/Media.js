import React, { useEffect, useState } from 'react';
import PostCard from '../PostCard/PostCard';

const Media = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/posts")
            .then(res => res.json())
            .then(data => setPosts(data))
    }, [])
    return (
        <section>
            <h2 className='text-3xl font-semibold'>View All The Posts</h2>
            <div className='grid gap-10 grid-cols-1 lg:grid-cols-2'>
                {
                    posts.map(post => <PostCard key={post._id} post={post}></PostCard>)
                }
            </div>
        </section>
    );
};

export default Media;