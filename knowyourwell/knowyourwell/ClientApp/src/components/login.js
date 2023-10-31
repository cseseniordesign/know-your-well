import React from 'react';
import './css/login_signup.css';

export default function Login() {

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            
            <div style={{ flex: 1 }}></div>
            
            <div style={{ flex: 1 }}>
                <h3 style={{ textAlign: "center", paddingBottom: "1em" }}>
                    Welcome to Know Your Well
                </h3>
                <div className="d-grid">
                    <a href="/Well" className="btn btn-primary">
                        Login Using Nebraska Cloud
                    </a>
                </div>
            </div>
            
            <div style={{ flex: 1 }}></div>
            
        </div>
    )
}