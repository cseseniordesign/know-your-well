import React from 'react';
import './css/login_signup.css';
import Axios from 'axios'

export default function Login() {

    const initRedirectRequest = () => {
        Axios
            .get("/sso/redirect")
            .then(function (response) {
                console.log(response);
            });
    };

    return (
        <div style={{textAlign: "center"}}>
            <h3>Log in</h3>
            <button onClick={initRedirectRequest}>Log in to Nebraska Cloud</button>
        </div>
    )
} 