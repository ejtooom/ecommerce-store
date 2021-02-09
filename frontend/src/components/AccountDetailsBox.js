import React from 'react';
import { Link } from 'react-router-dom';

import ListGroup from 'react-bootstrap/ListGroup';

import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';


const AccountDetailsBox = () => {

    return (
        <Row>
            <Col lg={12}>
                <ListGroup as="ul">
                    <ListGroup.Item as="li">
                        <Link as={Link} to="/accountdetails/userprofile">
                            User Profil
                        </Link>
                    </ListGroup.Item>
                    <ListGroup.Item as="li">
                        <Link as={Link} to="/accountdetails/invoiceaddress">
                            Invoice Address
                        </Link>
                    </ListGroup.Item>
                    <ListGroup.Item as="li">
                        <Link as={Link} to="/accountdetails/loyaltyprogram">
                            Loyalty program
                        </Link>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>)
}

export default AccountDetailsBox;