import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'react-external-link';

import logo from '../assets/logo.jpg';

import Nav from 'react-bootstrap/esm/Nav';
import Navbar from 'react-bootstrap/esm/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FaFacebookSquare, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';


const Footer = () => {
    return (
        <Container fluid className="footer">
            <Row>
                <Col lg={3} md={12} className="footer-logo">
                    <Navbar.Brand as={Link} to="/">
                        <img
                            src={logo}
                            alt="logo"
                        />
                    </Navbar.Brand>
                </Col>
                <Col lg={9} md={12}>
                    <Row>
                        <Col lg={4} md={12}>
                            <h4 className="hide-medium">PRODUCTS</h4>
                            <Navbar collapseOnSelect expand="lg" variant="light" bg="white">
                                <h4 className="hide-large">PRODUCTS</h4>
                                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                <Navbar.Collapse id="responsive-navbar-nav">
                                    <Nav defaultActiveKey="/home" className="flex-column">
                                        <Nav.Link as={Link} to="/products/first-category">First category</Nav.Link>
                                        <Nav.Link as={Link} to="/products/second-category">Second category</Nav.Link>
                                        <Nav.Link as={Link} to="/products/third-category">Third category</Nav.Link>
                                        <Nav.Link as={Link} to="/products/fourth-category">Fourth category</Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                        </Col>
                        <Col lg={4} md={12}>
                            <h4 className="hide-medium">LEGAL</h4>
                            <Navbar collapseOnSelect expand="lg" variant="light" bg="white">
                                <h4 className="hide-large">LEGAL</h4>
                                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                <Navbar.Collapse id="responsive-navbar-nav">
                                    <Nav defaultActiveKey="/home" className="flex-column">
                                        <Nav.Link as={Link} to="/privacy-policy">Privacy policy</Nav.Link>
                                        <Nav.Link as={Link} to="/conditions-of-purchase">Conditions of purchase</Nav.Link>
                                        <Nav.Link as={Link} to="/return-policy">Return policy</Nav.Link>
                                        <Nav.Link as={Link} to="/loyalty-program">Loyalty program</Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                        </Col>
                        <Col lg={4} md={12}>
                            <h4 className="hide-medium">GENERAL</h4>
                            <Navbar collapseOnSelect expand="lg" variant="light" bg="white">
                                <h4 className="hide-large">GENERAL</h4>
                                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                <Navbar.Collapse id="responsive-navbar-nav">
                                    <Nav defaultActiveKey="/home" className="flex-column">
                                        <Nav.Link as={Link} to="/about-us">About us</Nav.Link>
                                        <Nav.Link as={Link} to="/contact-us">Contact us</Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row >
                    <Col className="social-media-footer">
                    <ul>
                        <ExternalLink href="https://facebook.com"><li><FaFacebookSquare /></li></ExternalLink>
                        <ExternalLink href="https://twitter.com"><li><FaTwitter /></li></ExternalLink>
                        <ExternalLink href="https://instagram.com"><li><FaInstagram /></li></ExternalLink>
                        <ExternalLink href="https://linkedin.com"><li><FaLinkedinIn /></li></ExternalLink>
                    </ul>
                    </Col>

                    </Row>

        </Container>
    )
}

export default Footer;