import React from 'react';
import './css/login_signup.css';

export default function Login() {

    const initRedirectRequest = () => {
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
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            
            <div style={{ flex: 1 }}></div>
            
            <div style={{ flex: 1 }}>
                <h3 style={{ textAlign: "center", paddingBottom: "1em" }}>
                    Welcome to Know Your Well
                </h3>
                <div className="d-grid">
                <button type="button"  className="btn btn-primary btn-lg" onClick={initRedirectRequest}>Login</button>
                </div>
            </div>

            <div className="d-grid" >
            <button type="button"  className="btn btn-primary btn-lg" onClick={initRedirectRequest}>Login</button>

                <p></p>
            </div>
        </form>
    )
}