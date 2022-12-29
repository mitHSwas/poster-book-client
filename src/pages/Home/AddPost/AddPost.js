import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';

const AddPost = () => {
    const { user } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const imgHostKey = "f35da1b30e5217ea94f90ccafa6c077c";
    const navigate = useNavigate();
    const addPost = data => {
        const post = data.post;
        const image = data.image[0];
        const formData = new FormData();
        formData.append("image", image);
        fetch(`https://api.imgbb.com/1/upload?key=${imgHostKey}`, {
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
            .then(formData => {
                if (formData.success) {
                    const postInfo = {
                        post: post,
                        postImg: formData.data.url,
                    }
                    fetch("http://localhost:5000/posts", {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json',

                        },
                        body: JSON.stringify(postInfo)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                toast.success("Let's take a look to your post");
                                navigate('/media')
                            }
                        })
                }
            })
    };
    return (
        <section>
            <div>
                {user ? <form onSubmit={handleSubmit(addPost)}>
                    <textarea
                        className="textarea textarea-primary"
                        placeholder="Write your post..."
                        {...register("post", { required: "Post is required" })}
                    />
                    {errors.post && <p className='text-red-500' role="alert">{errors.post?.message}</p>}
                    <input type="file" className='file-input file-input-bordered w-3/6 max-w-xs' {...register("image", { required: "Please add Image" })} />
                    {errors.image && <p role="alert">{errors.image?.message}</p>}
                    <input className='btn btn-accent' type="submit" />
                </form> :
                    <h2 className='text-center font-bold text-4xl'>Do You Want To Post On POST-BOOK ? Please <Link className='text-red-500' to="/login">Login/Signup</Link> First!</h2>
                }
            </div>
        </section>
    );
};

export default AddPost;