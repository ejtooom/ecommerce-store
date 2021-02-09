import React from 'react';
import { Link, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { signout } from '../../actions/userActions';
import SearchBox from './SearchBox';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const BottomNavbar = () => {

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const signoutHandler = () => {
        dispatch(signout());
    };

    return (
        <Navbar className="navbar-margin" variant="light" bg="white" expand="lg" sticky="top">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <NavDropdown title="First category" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/products/first-category">First category</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/products/sub/st-first-subcategory">First subcategory</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/products/sub/st-second-subcategory">Second subcategory</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/products/sub/st-third-subcategory">Third subcategory</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                <Nav className="mr-auto">
                <NavDropdown title="Second category" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/products/second-category">Second category</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/products/sub/nd-first-subcategory">First subcategory</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/products/sub/nd-second-subcategory">Second subcategory</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/products/sub/nd-third-subcategory">Third subcategory</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                <Nav className="mr-auto">
                <NavDropdown title="Third category" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/products/third-category">Third category</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/products/sub/rd-first-subcategory">First subcategory</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/products/sub/rd-second-subcategory">Second subcategory</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/products/sub/rd-third-subcategory">Third subcategory</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                <Nav className="mr-auto">
                <NavDropdown title="Fourth category" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/products/fourth-category">Fourth category</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/products/sub/th-first-subcategory">First subcategory</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/products/sub/th-second-subcategory">Second subcategory</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/products/sub/th-third-subcategory">Third subcategory</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                <Route
                    render={({ history }) => (
                        <SearchBox history={history}></SearchBox>
                    )}
                    >
                </Route>
                </Navbar.Collapse>
                <Nav className="hide-medium">
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
                <Nav className="hide-medium">
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
                <Nav>
                <Nav.Link as={Link} to="/cart">
                    Cart 
                    {cartItems.length > 0 && (
                        <span className="badge">{cartItems.length}</span> )}
                </Nav.Link>
                </Nav>
        </Navbar>
    )
}

export default BottomNavbar;