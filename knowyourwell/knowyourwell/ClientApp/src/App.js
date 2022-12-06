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
import WellInfo from './components/wellinfo';
import Field from './components/field';
import Lab from './components/lab';
import EditLog from './components/editlog';
import AboutProject from './components/AboutProject';
import ViewField from './components/viewfield';
import ViewLab from './components/viewlab';
import ViewWell from './components/viewwell';


export default function App() { 
    return ( 
        <>
            <NavMenu />
            <Routes>  
                <Route exact path="/" element={<Login />} />
                <Route exact path="/signup" element={<SignUp />} />
                <Route exact path="/well" element={<Well />} />
                <Route exact path="/editwell" element={<EditWell />} />
                <Route exact path="/wellinfo" element={<WellInfo />} />
                <Route exact path="/field" element={<Field />} />
                <Route exact path="/lab" element={<Lab />} />
                <Route exact path="/editlog" element={<EditLog />} />
                <Route exact path="/aboutproject" element={<AboutProject />} />
                <Route exact path="/viewfield" element={<ViewField />} />
                <Route exact path="/viewlab" element={<ViewLab />} />
                <Route exact path="/viewwell" element={<ViewWell />} />

            </Routes>
        </>
    );
}
 