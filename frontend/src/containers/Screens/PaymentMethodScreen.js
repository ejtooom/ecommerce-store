import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../../components/UI/Input';
import CustomedButton from '../../components/UI/CustomedButton';
import CheckoutSteps from '../../components/CheckoutSteps';
import { savePaymentMethod } from '../../actions/cartActions';

import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'


const PaymentMethodScreen = (props) => {

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    if (!shippingAddress.address) {
        props.history.push('/shipping'); 
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        props.history.push('/placeorder');
    };

    return (
        <Fragment>
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        <Container>
            <Form className="form-screens" onSubmit={submitHandler}>
                <Col className="title-screens">
                    <h1>Payment Method</h1>
                </Col>
                <Col>
                    <Input
                        type="radio"
                        id="paypal"
                        labelRadio="PayPal"
                        value="PayPal"
                        name="paymentMethod"
                        required="required"
                        checked="checked"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Input>
                </Col>
                <Col>
                    <Input
                        type="radio"
                        id="stripe"
                        labelRadio="Stripe"
                        value="Stripe"
                        name="paymentMethod"
                        required="required"
                        onChange={(e) => setPaymentMethod(e.target.value)}
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

export default PaymentMethodScreen;