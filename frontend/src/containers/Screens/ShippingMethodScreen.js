import React, { useState, Fragment } from 'react';

import CustomedButton from '../../components/UI/CustomedButton';
import CheckoutSteps from '../../components/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingMethod } from '../../actions/cartActions';

import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/Col';
import Input from '../../components/UI/Input';
import Form from 'react-bootstrap/Form';


const ShippingMethodScreen = (props) => {

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    if (!shippingAddress.address) {
        props.history.push('/shipping');
    }

    const [shippingMethod, setShippingMethod] = useState('FedEx');
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingMethod(shippingMethod))
        props.history.push('/payment');
    };

    return (
        <Fragment>
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <Container>
            <Form className="form-screens" onSubmit={submitHandler}>
                <Col className="title-screens">
                    <h1>Shipping Method</h1>
                </Col>
                <Col>
                    <Input
                        type="radio"
                        id="fedexregular"
                        labelRadio="FedEx"
                        value="FedEx"
                        name="shippingMethod"
                        required="required"
                        checked="checked"
                        onChange={(e) => setShippingMethod(e.target.value)}
                    ></Input>
                </Col>
                <Col>
                    <Input
                        type="radio"
                        id="fedexexpress"
                        labelRadio="FedEx Express"
                        value="FedEx Express"
                        name="shippingMethod"
                        required="required"
                        onChange={(e) => setShippingMethod(e.target.value)}
                    ></Input>
                </Col>
                <Col>
                    <Input
                        type="radio"
                        id="personalpickup"
                        labelRadio="Personal pickup"
                        value="Personal Pickup"
                        name="shippingMethod"
                        required="required"
                        onChange={(e) => setShippingMethod(e.target.value)}
                    ></Input>
                </Col>
                <Col>
                    <CustomedButton variant="dark" class="full-width margin-top btn-weight" type="submit">
                        Continue
                    </CustomedButton>
                </Col>
            </Form>
        </Container>
        </Fragment>
    )
}

export default ShippingMethodScreen;