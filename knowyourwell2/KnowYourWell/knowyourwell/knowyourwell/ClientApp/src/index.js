import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

///start

const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json())

// Route to get all posts
app.get("/api/get", (req, res) => {
    db.query("SELECT * FROM posts", (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    });
});

// Route to get one post
app.get("/api/getFromId/:id", (req, res) => {

    const id = req.params.id;
    db.query("SELECT * FROM posts WHERE id = ?", id,
        (err, result) => {
            if (err) {
                console.log(err)
            }
            res.send(result)
        });
});


//end 




root.render(
    <BrowserRouter basename={baseUrl}>
        <App />
    </BrowserRouter>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

