import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';

const Login = () => {
    const { loginUser, facebookLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        loginUser(email, password)
            .then(result => {
                const user = result.user;
                form.reset()
                toast.success("Login successful")
                navigate(from, { replace: true });
                console.log(user)
            })
            .catch(err => {
                console.error(err.message);
            })
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
                <form onSubmit={handleLogin} className="card-body">
                    <h3 className='text-4xl font-bold text-center'>Login</h3>
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
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <input className="btn btn-primary" type="submit" value="Login" />
                        <p className='mt-3'>New in Poster-book? <Link className='text-orange-500' to="/signup">Sign Up</Link></p>
                        <div className="divider">Or Continue With</div>
                    </div>
                    <div className='mx-auto'><button onClick={handleFbLogin} className='btn btn-warning'>Facebook</button></div>
                </form>
            </div>
        </div>
    );
};

export default Login;