import React from 'react';
import './css/login_signup.css';
import Axios from 'axios'

export default function Login() {

    const initRedirectRequest = () => {
        console.log("HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
        const options = {
            method: 'GET',
            mode: 'no-cors'
          };
        fetch("/sso/redirect", options)
            .then(function(response) {

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text()
            })
            .then(function(data) {
                window.location.href = data;
            })
            .catch(function(error) {
                console.log("ERROR")
                console.error("Error:", error);
            });
    };
    

    return (
        <form id="style-login-signup-form">
            <h3 style={{ textAlign: "center", paddingBottom: "1em" }}>Login</h3>
            <div className="mb-3">
                <label >Email address</label>
                <input id="resize"
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
            <button type="button"  className="btn btn-primary btn-lg" onClick={initRedirectRequest}>Login</button>

                <p></p>
            </div>
        </form>
    )
}