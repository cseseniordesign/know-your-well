import React from 'react';
import './css/login_signup.css';
import Axios from 'axios'

export default function Login() {

    const initRedirectRequest = () => {
        Axios
            .get("/sso/redirect")
            .then(function (response) {
                console.log("HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
                console.log(response);
            });
    };

    return (
        <div className="d-grid" >
            <a href="/Well" className="btn btn-primary" >Log in to Nebraska Cloud</a>
            <p></p>
        </div>
    )
}
// onClick={initRedirectRequest}
// href="/Well"