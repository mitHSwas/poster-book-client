// import { useQuery } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import Comments from '../Comments/Comments';

const PostDetails = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const postId = useParams();

    const { data: postDetails = [], isLoading } = useQuery({
        queryKey: ["postDetails", postId],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/postDetails/${postId.id}`);
            const data = res.json();
            return data;
        }
    })

    const { data: comments = [], refetch } = useQuery({
        queryKey: ["comments", postId],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/comments/${postId.id}`);
            const data = res.json();
            return data;
        }
    })

    console.log("comments", comments);

    const addComment = data => {
        const comment = data.comment;
        const commentInfo = {
            postId: postId.id,
            comment: comment
        }
        fetch("http://localhost:5000/comments", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(commentInfo)
        })
            .then(res => res.json())
            .then(comment => {
                if (comment.acknowledged) {
                    toast.success("Thanks for your comment")
                    refetch();
                }
            });
    }
    if (isLoading) {
        return <h4>Loading...</h4>
    }
    return (
        <div className="">
            <div className="card mx-auto w-4/6 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={postDetails.postImg} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <p>{postDetails.post}</p>
                    <div className="divider"></div>
                    <div className="w-full flex justify-between">
                        <button className="btn btn-primary">Like</button>
                        <form onSubmit={handleSubmit(addComment)} className='flex gap-3'>
                            <span>
                                <input type="text" {...register("comment", { required: "Write your comment first!" })} placeholder="Write your comment" className="input input-bordered w-full max-w-xs" />
                                {errors.comment && <p className='text-red-500' role="alert">{errors.comment?.message}</p>}
                            </span>
                            <input className="btn btn-outline btn-success" type="submit" value="Add" />
                        </form>
                    </div>
                    <div className="divider"></div>
                    {!comments ? <h3 className='text-2xl font-semibold'>No Comment Added.</h3> : <div>
                        {
                            comments.map(comment => <Comments key={comment._id} comment={comment}></Comments>)
                        }
                    </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default PostDetails;