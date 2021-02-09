import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { signout } from '../../actions/userActions';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';


const TopNavbar = () => {

    const dispatch = useDispatch();

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const signoutHandler = () => {
        dispatch(signout());
    };

    return (
        <Navbar className="navbar-margin navbar-top hide-large" variant="light" expand="lg">
                <Nav>
                {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/accountdetails">Account Details</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/orderhistory">Order History</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="#signout" onClick={signoutHandler}>Sign Out</NavDropdown.Item>
                    </NavDropdown>
                ) :
                (
                    <Nav.Link as={Link} to="/signin">Sign In</Nav.Link>
                )}
                </Nav>
                <Nav>
                {userInfo && userInfo.isAdmin && (
                    <NavDropdown title='Admin' id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/productlist">Products</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/orderlist">Orders</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/userlist">Users</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/admin-messagelist">Messages</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
                    </NavDropdown>
                )} 
                </Nav>
        </Navbar>
    )
}

export default TopNavbar;