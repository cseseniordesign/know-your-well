import React, { Component } from 'react';
import Userfront from "@userfront/core";
import './css/style.css';

// Initialize Userfront Core JS
Userfront.init("demo1234");


export class Login extends Component {
    static displayName = Login.name;

    render() {
        return (
            <form>
                <h1 id="kyw">Know Your Well</h1>
                <h3>Sign In</h3>
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
                    {
                       /*Submit button removed so sign-in automatically goes to Wells Page
                        * 
                        * <button type="submit" className="btn btn-primary" >
                           Submit
                          </button>
                       */}
                    <a href="/Well" class="btn btn-primary">Sign In</a>
                    <p></p>
                    <a href="/Signup" class="btn btn-primary">Sign Up</a>
                </div>
                <p className="forgot-password text-right" >
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        )
    }
}