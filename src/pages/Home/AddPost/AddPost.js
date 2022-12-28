import React from 'react';
import { useForm } from 'react-hook-form';

const AddPost = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const imgHostKey = "f35da1b30e5217ea94f90ccafa6c077c";
    const addPost = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append("image", image);
        fetch(`https://api.imgbb.com/1/upload?key=${imgHostKey}`, {
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.success)
            })
    };
    return (
        <section>
            <div>
                <form onSubmit={handleSubmit(addPost)}>
                    <textarea
                        className="textarea textarea-primary"
                        placeholder="Write your post..."
                        {...register("post", { required: "Post is required" })}
                    />
                    {errors.post && <p className='text-red-500' role="alert">{errors.post?.message}</p>}
                    <input type="file" {...register("image", { required: "Please add Image" })} />
                    {errors.post && <p role="alert">{errors.post?.message}</p>}
                    <input className='btn btn-accent' type="submit" />
                </form>
            </div>
        </section>
    );
};

export default AddPost;