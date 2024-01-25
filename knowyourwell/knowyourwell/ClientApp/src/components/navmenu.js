// import React from 'react'
// import { useUser } from './reusable/usercontext';
// import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap'
// import { Link } from 'react-router-dom'
// import './css/NavMenu.css';



// export default class NavMenu extends React.Component {

//     constructor(props) {
//         super(props);

//         this.toggleNavbar = this.toggleNavbar.bind(this);
//         this.state = {
//             collapsed: true
//         };
//     }

//     toggleNavbar() {
//         this.setState({
//             collapsed: !this.state.collapsed
//         });
//     }

//     render() {
//         const { user } = useUser();

//         return (
//             <header>
//                 <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
//                     <NavbarBrand tag={Link} to="/" className="banner"></NavbarBrand>
//                     <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
//                     <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
//                     <div style={{ fontFamily: 'Georgia, serif' }}>{user.name}</div>
//                         <ul className="navbar-nav flex-grow">
//                             <NavItem>
//                                 <NavLink tag={Link} className="text-dark" to="/">Login</NavLink>
//                             </NavItem>
//                             <NavItem>
//                                 <NavLink tag={Link} className="text-dark" to="Well">Well</NavLink>
//                             </NavItem>
//                             <NavItem>
//                                 <NavLink tag={Link} className="text-dark" to="AboutProject">About Project</NavLink>
//                             </NavItem>
//                         </ul>
//                     </Collapse>
//                 </Navbar>
//             </header>
//         );
//     }
// }

import React, { useState } from 'react';
import { useUser } from './reusable/usercontext';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './css/NavMenu.css';

const NavMenu = () => {
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);
    // let { user } = useUser();
    // if (user == null) {
    //     user = { name: ""}
    // }
    const { user } = useUser() || { user: { name: "" } };

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                <NavbarBrand tag={Link} to="/" className="banner"></NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                {user && <div style={{ fontFamily: 'Georgia, serif', float: 'right' }}>{user.name}</div>}
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

