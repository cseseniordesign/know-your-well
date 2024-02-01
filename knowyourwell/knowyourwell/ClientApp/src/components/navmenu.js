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
    // let { user } = useUser();
    // if (user == null) {
    //     user = { name: ""}
    // }
    // const { user } = useUser() || { user: { name: "" } };
    // let school = ""
    // let name = ""

    
    Axios.get('/userinfo', {
        responseType: "json"
    }).then(function (response) {
        // console.log("CHECK RESPONSE HERE")
        // console.log("")
        // school = response.data.kywmem
        // name = response.data.displayn
        setSchool(response.data.kywmem);
        setName(response.data.displayn);
        // console.log(controlled_json);
        // console.log(controlled_json.kywmem)
        // console.log(controlled_json.displayn)
        // console.log("")
    })
    // (async () => {
    //     try {
    //         const response = await Axios.get('/userinfo', { responseType: "json" });
    //         school = response.data.kywmem;
    //         name = response.data.displayn;
    
    //     } catch (error) {
    //         console.error("Error fetching data: ", error);
    //     }
    // })();

    console.log(school)
    console.log(name)

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                <NavbarBrand tag={Link} to="/" className="banner"></NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                <div style={{ fontFamily: 'Georgia, serif', float: 'right' }}>{school}{name}</div>
                <div style={{ fontFamily: 'Georgia, serif', float: 'right' }}>HELLO</div>
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

