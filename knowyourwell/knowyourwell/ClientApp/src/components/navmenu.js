import React, { useState } from "react";
import Axios from "axios";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import csvKey from "./resources/csvkey";
import "./css/NavMenu.css";

import { useUser } from "./usercontext";

const NavMenu = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
  const { user, setUser } = useUser();

  const initLogout = async () => {
    await Axios.get("/logout", {
      responseType: "json",
    });
    window.location.href = "/";
  };

  return (
    <header>
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
        container
        light
      >
        <NavbarBrand tag={Link} to="/" className="banner"></NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse
          className="d-sm-inline-flex flex-sm-row-reverse"
          isOpen={!collapsed}
          navbar
        >
          {user && (
            <button
              onClick={initLogout}
              style={{
                marginLeft: "10px",
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            >
              <strong>Logout</strong>
            </button>
          )}
          <div> </div>
          <div style={{ float: "right" }}>
            <strong>{user?.displayn}</strong>
          </div>
          <ul className="navbar-nav flex-grow">
            {user ? (
              <NavItem>
                <NavLink tag={Link}className="text-dark" to="Export">
                  Export Data
                </NavLink>
              </NavItem>
            ) : (
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/">
                  Login
                </NavLink>
              </NavItem>
            )}
            <NavItem>
              {user && (
                <NavLink tag={Link} className="text-dark" to="Well">
                  Well
                </NavLink>
              )}
              {/* <NavLink tag={Link} className="text-dark" to="Well">Well</NavLink> */}
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="AboutProject">
                About Project
              </NavLink>
            </NavItem>
          </ul>
        </Collapse>
      </Navbar>
      <div className="displayname"></div>
    </header>
  );
};

export default NavMenu;
