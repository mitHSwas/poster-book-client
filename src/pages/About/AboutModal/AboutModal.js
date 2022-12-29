import React from 'react';
import { toast } from 'react-hot-toast';

const AboutModal = (props) => {
    const { _id, name, email, address, university, phone } = props.about;
    const handleUpdate = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const university = form.university.value;
        const address = form.address.value;
        const updateInfo = {
            _id, name, email, phone, university, address
        }
        fetch("http://localhost:5000/about", {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(updateInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log("data", data);
                if (data.modifiedCount > 0) {
                    toast.success("Your information updated successfully.")
                }
            })
    }
    return (
        <div>
            <input type="checkbox" id="aboutModal" className="modal-toggle" />
            <div className="modal">
                <form onSubmit={handleUpdate} className="modal-box relative">
                    <div className="form-control mx-auto w-full max-w-xs">
                        <h3 className='text-2xl font-semibold text-center'>Update Your Identity:</h3>
                        <label className="label">
                            <span className="label-text">Your Name:</span>
                        </label>
                        <input type="text" name="name" defaultValue={name} placeholder="Type here" className="input input-bordered w-full max-w-xs" required />
                        <label className="label">
                            <span className="label-text">Email:</span>
                        </label>
                        <input type="email" name="email" defaultValue={email} placeholder="Type here" className="input input-bordered w-full max-w-xs" required />
                        <label className="label">
                            <span className="label-text">Phone-number:</span>
                        </label>
                        <input type="text" name="phone" defaultValue={phone} placeholder="Type here" className="input input-bordered w-full max-w-xs" required />
                        <label className="label">
                            <span className="label-text">Educational Institution:</span>
                        </label>
                        <input type="text" name="university" defaultValue={university} placeholder="Type here" className="input input-bordered w-full max-w-xs" required />
                        <label className="label">
                            <span className="label-text">Address:</span>
                        </label>
                        <input type="text" name="address" defaultValue={address} placeholder="Type here" className="input input-bordered w-full max-w-xs" required />
                        <input htmlFor="aboutModal" className='mx-auto btn btn-primary mt-3' type="submit" value="Submit" />
                        <label htmlFor="aboutModal" className='mx-auto btn btn-primary mt-3'>Close</label>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AboutModal;