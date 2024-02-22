import React, { useState } from 'react';
import Axios from 'axios'
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './css/NavMenu.css';

const NavMenu = () => {
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);
    const [school, setSchool] = useState("");
    const [name, setName] = useState("");
    
    
    Axios.get('/userinfo', {
        responseType: "json"
    }).then(function (response) {
        setSchool(response.data.kywmem);
        setName(response.data.displayn);
    })

    const initLogout = () => {
        Axios.get('/logout', {
            responseType: "json"
        }).then(function (response) {
            setSchool(response.data.kywmem);
            setName(response.data.displayn);
        })
        window.location.href = '/';
    };


    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                <NavbarBrand tag={Link} to="/" className="banner"></NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                {name && <button onClick={initLogout} style={{marginLeft: '10px', background: 'none',border: 'none',padding: 0,cursor: 'pointer'}}><strong>Logout</strong></button>}
                <div>  </div>
                <div style={{ float: 'right' }}><strong>{name}</strong></div>
                    <ul className="navbar-nav flex-grow">
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/">Login</NavLink>
                        </NavItem>
                        <NavItem>
                            {name && <NavLink tag={Link} className="text-dark" to="Well">Well</NavLink>}
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="AboutProject">About Project</NavLink>
                        </NavItem>
                    </ul>
                </Collapse>
            </Navbar>
            <div class="displayname">
            </div>
        </header>
    );
}

export default NavMenu;

