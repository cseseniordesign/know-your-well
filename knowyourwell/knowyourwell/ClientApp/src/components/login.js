import React from 'react';
import './css/login_signup.css';


export default function Login() {
    return (
        <form id="style-login-signup-form">
            <h3 style={{ textAlign: "center", paddingBottom: "1em" }}>Log in</h3>
            <div className="mb-3">
                <label >Email address</label>
                <input id="resize"
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                />
            </div>
            <div className="mb-3">
                <label  >Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                />
            </div>
            <div className="mb-3">
                <div className="custom-control custom-checkbox">
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck1"
                    />
                    <label className="custom-control-label" htmlFor="customCheck1">
                        Remember me
                    </label>
                </div>
            </div>
            <div className="d-grid" >
                <a href="/Well" className="btn btn-primary">Log in</a>
                <p></p>
                <a href="/Signup" className="btn btn-primary">Sign Up</a>
            </div>
            <p className="forgot-password text-right" >
                Forgot <a href="/">password?</a>
            </p>
        </form>
    )
}
