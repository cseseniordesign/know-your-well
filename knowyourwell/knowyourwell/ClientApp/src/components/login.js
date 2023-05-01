import React from 'react';
import './css/login_signup.css';
import Axios from 'axios'



export default function Login() {

    const initRedirectRequest = () => {
        //window.location.href = `/sso/redirect`;
        console.log("Initiating redirect request in front end");
        Axios
            .get("/sso/redirect")
            .then(function (response) {
                console.log(response);
            });
    };

    return (
        <form id="style-login-signup-form">
            <h3 style={{ textAlign: "center", paddingBottom: "1em" }}>Log in</h3>
            <button onClick={initRedirectRequest}>
                Log in to Nebraska Cloud
            </button>
        </form>
    )
} 