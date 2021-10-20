import React from 'react';
import {Navbar} from 'react-bootstrap';
import logo from '../../images/logo.png';

const NavBar = () => {

    return (
        <div className="nav-bar" style={{height: "75px"}}>
            <Navbar sticky="top">
                <img  src={logo} style={{height: "50px"}} alt="logo" />
            </Navbar>
        </div>
    );
}

export default NavBar;