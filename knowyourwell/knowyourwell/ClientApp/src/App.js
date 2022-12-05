import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import './components/css/custom.css';
import './components/css/style.css';
//pages
import Login from "./components/login"; 
import SignUp from './components/signup';
import NavMenu from './components/NavMenu';
import Well from './components/well';
import EditWell from './components/editwell';
import PreField from './components/prefield';
import Field from './components/field';
import Lab from './components/lab';
import EditLog from './components/editlog';
import AboutProject from './components/aboutproject';  


export default function App() { 
    return ( 
        <>
            <NavMenu />
            <Routes>  
                <Route exact path="/" element={<Login />} />
                <Route exact path="/signup" element={<SignUp />} />
                <Route exact path="/well" element={<Well />} />
                <Route exact path="/editwell" element={<EditWell />} />
                <Route exact path="/prefield" element={<PreField />} />
                <Route exact path="/field" element={<Field />} />
                <Route exact path="/lab" element={<Lab />} />
                <Route exact path="/editlog" element={<EditLog />} />
                <Route exact path="/aboutproject" element={<AboutProject />} />
            </Routes>
        </>
    );
}
 