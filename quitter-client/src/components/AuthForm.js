import React, { useState } from 'react';

const AuthForm = (props) => {
    const [formData, setformData] = useState({
        email: "",
        username: "",
        password: "",
        profileImgUrl: ""
    })
    const { heading, buttonText, signup, errors, history, removeError } = props;

    history.listen(() => {
        removeError();
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const type = props.signup ? "signup" : "signin";
        props.onAuth(type, formData)
            .then(() => {
                props.history.push("/");
            }).catch(()=>{
                return;
            })
    }
    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="authForm-hero">
            <div className="row justify-content-md-center text-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <h4 className="my-5">{heading}</h4>
                        {errors.message && <div className="alert alert-danger">{errors.message}</div>}
                        <div className="mb-3">
                            <label htmlFor="InputEmail" className="form-label">Email</label>
                            <input type="email" name="email" value={formData.email} className="form-control" id="InputEmail" aria-describedby="emailHelp" onChange={handleChange} required />
                        </div>
                        {signup && (
                            <div>
                                <div className="mb-3">
                                    <label htmlFor="InputUsername" className="form-label">Username</label>
                                    <input type="text" name="username" value={formData.username} className="form-control" id="InputUsername" onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="InputProfileImgUrl" className="form-label">Profile Image Url</label>
                                    <input type="text" name="profileImgUrl" value={formData.profileImgUrl} className="form-control" id="InputProfileImgUrl" onChange={handleChange} />
                                </div>
                            </div>
                        )}
                        <div className="mb-3">
                            <label htmlFor="InputPassword" className="form-label">Password</label>
                            <input type="password" name="password" value={formData.password} className="form-control" id="InputPassword" onChange={handleChange} required />
                        </div>
                        <button className="btn btn-lg btn-primary btn-block">{buttonText}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default AuthForm
