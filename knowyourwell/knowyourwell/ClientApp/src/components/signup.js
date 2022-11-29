import React from 'react';
import './css/login_signup.css';



export default function SignUp() {

    return (
        <form id="style-login-signup-form">
            <h3 style={{ textAlign: "center", paddingBottom: "1em" }}>Sign Up</h3>
            <div className="mb-3">
                <label>First name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                />
            </div>
            <div className="mb-3">
                <label>Last name</label>
                <input type="text" className="form-control" placeholder="Last name" />
            </div>
            <div className="mb-3">
                <label>Email address</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                />
            </div>
            <div className="mb-3">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                />
            </div>
            <div className="d-grid">
                <button type="submit" className="btn btn-primary" >
                    Sign Up
                </button>
            </div>
            <p className="forgot-password text-right">
                Already registered <a href="/">Log in?</a>
            </p>
        </form>
    )
}
