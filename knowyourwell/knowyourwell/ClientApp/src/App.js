import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import './components/css/custom.css';
import './components/css/style.css';
//pages
import Login from "./components/login"; 
import SignUp from './components/signup';
import NavMenu from './components/navmenu';
import Well from './components/well';
import EditWell from './components/editwell';
import WellInfo from './components/wellinfo';
import Field from './components/field';
import ClassLab from './components/classlab';
import EditLog from './components/editlog';
import AboutProject from './components/aboutproject';
import ViewField from './components/viewfield';
import ViewClassLab from './components/viewclasslab';
import ViewWell from './components/viewwell';
import FieldSelection from './components/fieldselection';
import FormSubmission from './components/formsubmission';


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
                <Route exact path="/classlab" element={<ClassLab />} />
                <Route exact path="/editlog" element={<EditLog />} />
                <Route exact path="/aboutproject" element={<AboutProject />} />
                <Route exact path="/viewfield" element={<ViewField />} />
                <Route exact path="/viewclasslab" element={<ViewClassLab />} />
                <Route exact path="/viewwell" element={<ViewWell />} />
                <Route exact path="/fieldselection" element={<FieldSelection />} />
                <Route exact path="/formsubmission" element={<FormSubmission />} />
            </Routes>
        </>
    );
}
 