import React from 'react';

import CustomedButton from '../components/UI/CustomedButton';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'


const ProductDeliveryDetails = (props) => {

    return (
        <Col className="product-delivery-details">
            <Row>
                <Col lg={4} md={4} sm={6} xs={6}>
                    <h5>Delivery Time:</h5>
                </Col>
                <Col lg={8} md={8} sm={6} xs={6}>
                    <h5>{props.deliveryTime}</h5>
                </Col>
            </Row>
            <Row>
                <Col lg={4} md={4} sm={6} xs={6}>
                    <h5>Price:</h5>
                </Col>
                <Col lg={8} md={8} sm={6} xs={6}>
                    <h2><strong>{props.price} €</strong></h2>
                </Col>
            </Row>
            <Row>
                <Col lg={4} md={4} sm={6} xs={6}>
                    <h5>Status:</h5>
                </Col>
                <Col lg={8} md={8} sm={6} xs={6} className={props.statusClass}>
                    <h5>{props.status}</h5>
                </Col>
            </Row>
            {props.countInStock > 0 && (
                <Row>
                    <Col lg={4} md={4} sm={6} xs={6}>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Control as="select" value={props.qty} onChange={(e) => props.setQty(e.target.value)}>
                                {[...Array(props.countInStock).keys()].map(
                                    (x) => (
                                        <option key={x + 1} value={x + 1}> {x + 1}</option>
                                    )
                                )}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col lg={8} md={8} sm={6} xs={6}>
                        <CustomedButton
                            class="full-width btn-weight"
                            variant='dark'
                            onClick={props.addToCartHandler}
                        >
                            ADD TO CART
                        </CustomedButton>
                    </Col>
                </Row>
            )}
            <Row className="product-brand-details">
                <Col>
                    <h5>Brand: </h5> <h5>{props.brand}</h5>
                </Col>
                <Col>
                    <h5>Item code: </h5> <h5>{props.productId}</h5>
                </Col>
                <Col>
                    <h5>Ask about item</h5>
                </Col>
            </Row>
        </Col>
    )
}

export default ProductDeliveryDetails;