import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const CheckoutSteps = (props) => {
    
    return (
        <Row className="checkout-steps">
            <Col className={props.step1 ? 'active' : ''}>Sign-In</Col>
            <Col className={props.step2 ? 'active' : ''}>Shipping Address</Col>
            <Col className={props.step3 ? 'active' : ''}>Shipping Method</Col>
            <Col className={props.step4 ? 'active' : ''}>Payment Method</Col>
            <Col className={props.step5 ? 'active' : ''}>Place Order</Col>
        </Row>
    )
}

export default CheckoutSteps;