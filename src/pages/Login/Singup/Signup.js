import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';

const Signup = () => {
    const { createUser, updateUser, facebookLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleSignup = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        createUser(email, password)
            .then(result => {
                const user = result.user;
                profileInfo(name)
                form.reset()
                navigate(from, { replace: true });
                console.log(user)
            })
            .catch(err => {
                console.error(err.message);
            })
    }
    const profileInfo = name => {
        const updateInfo = {
            displayName: name,
        }
        updateUser(updateInfo)
            .then(res => {
                toast.success("User created successfully.")
            })
            .catch(err => console.error(err))
    }
    const handleFbLogin = () => {
        facebookLogin()
            .then(res => {
                const user = res.user;
                navigate(from, { replace: true });
                console.log(user);
            })
            .catch(err => console.error(err.message))
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="card flex-shrink-0 w-96 shadow-2xl bg-base-100">
                <form onSubmit={handleSignup} className="card-body">
                    <h3 className='text-4xl font-bold text-center'>Signup</h3>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="name" name="name" placeholder="name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                    </div>
                    <div className="form-control mt-6">
                        <input className='btn btn-primary' type="submit" value="Signup" />
                        <p className='mt-3'>Already have an account? please <Link className='text-orange-500' to="/login">Login</Link></p>
                        <div className="divider">Or Continue With</div>
                    </div>
                    <div className='mx-auto'><button onClick={handleFbLogin} className='btn btn-warning'>Google</button></div>
                </form>
            </div>
        </div>
    );
};

export default Signup;