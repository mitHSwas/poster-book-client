import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import AboutModal from '../AboutModal/AboutModal';

const About = () => {
    const [about, setAbout] = useState([]);
    const { Name } = useContext(AuthContext);
    console.log(Name);
    useEffect(() => {
        fetch("http://localhost:5000/about")
            .then(res => res.json())
            .then(data => setAbout(data));
    }, [])
    const { _id, name, email, address, university, phone } = about;
    return (
        <section>
            <div className="card mx-auto w-96 bg-base-100 shadow-2xl">
                <div className="card-body">
                    <div className="card-actions justify-end">
                        <label htmlFor="aboutModal" className="btn btn-primary btn-sm">Edit</label>
                    </div>
                    {about && <div>
                        <h3 className="text-2xl font-semibold">{name}</h3>
                        <p>Email: {email}</p>
                        <p>Phone: {phone}</p>
                        <p>University: {university}</p>
                        <p>Address: {address}</p>
                    </div>}
                </div>
            </div>
            <AboutModal about={about}></AboutModal>
        </section>
    );
};

export default About;

