import React from 'react';
import './css/login_signup.css';
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const navigate = useNavigate();
    const initRedirectRequest = () => {
        console.log(process.env.NODE_ENV)
        // if(process.env.NODE_ENV == "development"){
            Axios.get('/createDevSession',{
                responseType: "json"
            }).then(function (response) {
                if(response.data.success == "success"){
                    console.log("navigating")
                    navigate("/Well");
                }
            }).catch(function (error) {
                console.error("Failed to create dev sesh:", error);
            });
        // }else {
        //     const options = {
        //         method: 'GET',
        //         mode: 'no-cors'
        //     };
        //     fetch("/sso/redirect", options)
        //         .then(function(response) {

        //             if (!response.ok) {
        //                 throw new Error("Network response was not ok");
        //             }
        //             return response.text()
        //         })
        //         .then(function(data) {
        //             window.location.href = data;
        //         })
        //         .catch(function(error) {
        //             console.log("ERROR")
        //             console.error("Error:", error);
        //         });
        // }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            
            <div style={{ flex: 1 }}></div>
            
            <div style={{ flex: 1 }}>
                <h3 style={{ textAlign: "center", paddingBottom: "1em" }}>
                    Welcome to Know Your Well
                </h3>
                <div className="d-grid">
                <button type="button"  className="btn btn-primary btn-lg" onClick={initRedirectRequest}>Login with School Credentials</button>
                </div>
            </div>
            
            <div style={{ flex: 1 }}></div>
            
        </div>
    )
}