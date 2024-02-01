import React, { useState } from 'react';
import { useUser } from './usercontext';
import Axios from 'axios'
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './css/NavMenu.css';

const NavMenu = () => {
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);
    const [school, setSchool] = useState("");
    const [name, setName] = useState("");
    

    //  { user } = useUser() || { user: { name: "" } };
    
    Axios.get('/userinfo', {
        responseType: "json"
    }).then(function (response) {
        setSchool(response.data.kywmem);
        setName(response.data.displayn);
    })

    // let { user } = useUser();
    // if (user == null) {
    //     user = { name: ""}
    // }


    // console.log(school)
    // console.log(name)

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                <NavbarBrand tag={Link} to="/" className="banner"></NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                <div style={{ fontFamily: 'Georgia, serif', float: 'right' }}><strong>{name}</strong></div>
                    <ul className="navbar-nav flex-grow">
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/">Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="Well">Well</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="AboutProject">About Project</NavLink>
                        </NavItem>
                    </ul>
                </Collapse>
            </Navbar>
        </header>
    );
}

export default NavMenu;

