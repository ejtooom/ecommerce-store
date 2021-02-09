import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.jpg';

import Navbar from 'react-bootstrap/Navbar';


const MiddleNavbar = () => {

    return (
        <Navbar className="navbar-center" variant="light" expand="lg" fixed="sticky">
            <Navbar.Brand  as={Link} to="/">
                <img
                    src={logo}
                    alt="logo"
                />
            </Navbar.Brand>
        </Navbar>
    )
}

export default MiddleNavbar;