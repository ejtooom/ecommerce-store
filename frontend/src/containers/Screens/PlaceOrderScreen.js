import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { createOrder } from '../../actions/orderActions';
import CheckoutSteps from '../../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../../constants/orderConstants';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import CustomedButton from '../../components/UI/CustomedButton';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';


const PlaceOrderScreen = (props) => {

    const cart = useSelector((state) => state.cart);
    if (!cart.paymentMethod) {
      props.history.push('/payment');
    }

    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, success, error, order } = orderCreate;
    const toPrice = (num) => Number(num.toFixed(2)); 
    cart.itemsPrice = toPrice(
      cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    );

    cart.shippingPrice = cart.shippingMethod === "FedEx" ? toPrice(19.99) : cart.shippingMethod === "FedEx Express" ? toPrice(29.99) : toPrice(0);
    cart.taxPrice = toPrice(0.23 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice;
    const dispatch = useDispatch();
    const placeOrderHandler = () => {
      dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    };

    useEffect(() => {
      if (success) {
        props.history.push(`/order/${order._id}`);
        dispatch({ type: ORDER_CREATE_RESET });
      }
    }, [dispatch, order, props.history, success]);

    return (
        <Fragment>
        <CheckoutSteps step1 step2 step3 step4 step5></CheckoutSteps>
        <Container>
            <Row className="cart-item-header hide-medium">
                <Col lg={3} className="cart-details-header">
                </Col>
                <Col lg={3} className="cart-details-header">
                    PRODUCT
                </Col>
                <Col lg={2} className="cart-details-header">
                    QUANTITY
                </Col>
                <Col lg={2} className="cart-details-header">
                    PRICE
                </Col>
                <Col lg={2} className="cart-details-header">
                    TOTAL
                </Col>
                </Row>
            {cart.cartItems.map((item) => (
                <Row className="cart-item">
                <Col lg={3} md={6} sm={6} xs={6}>
                    <Card style={{ width: '6rem' }}>
                        <Card.Img variant="top" src={item.image} />
                    </Card>
                </Col>
                <Col lg={3} md={6} sm={6} xs={6} className="cart-details">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                </Col>
                <Col lg={2} md={4} sm={4} xs={4} className="cart-details">
                    <p><strong>Quantity: </strong></p>{item.qty}
                </Col>
                <Col lg={2} md={4} sm={4} xs={4} className="cart-details">
                    <p><strong>Price: </strong></p>{item.price} €
                </Col>
                <Col lg={2} md={4} sm={4} xs={4} className="cart-details">
                    <p><strong>Total: </strong></p>{item.qty * item.price} €
                </Col>
                </Row>
            ))}
            <Row className="place-order-details">
                <Col lg={3} md={3} sm={12} xs={12}>
                    <h3>Shipping Address</h3>
                    {cart.shippingAddress.fullName} <br />
                    {cart.shippingAddress.address} <br />
                    {cart.shippingAddress.city} <br />
                    {cart.shippingAddress.postalCode} <br />
                    {cart.shippingAddress.country} <br />
                    {cart.shippingAddress.number} <br />
                    <Link to="/shipping">(change)</Link>
                </Col>
                <Col lg={3} md={3} sm={12} xs={12}>
                    <h3>Invoice Address</h3>
                    {cart.invoiceAddress.fullName} <br />
                    {cart.invoiceAddress.companyName} <br />
                    {cart.invoiceAddress.companyNumber} <br />
                    {cart.invoiceAddress.address} <br />
                    {cart.invoiceAddress.city} <br />
                    {cart.invoiceAddress.postalCode} <br />
                    {cart.invoiceAddress.country} <br />
                    {cart.invoiceAddress.number} <br />
                    <Link to="/accountdetails/invoiceaddress">(change)</Link>
                </Col>
                <Col lg={3} md={3} sm={12} xs={12}>
                    <h3>Info</h3>
                    Selected form of delivery: <strong>{cart.shippingMethod}</strong> <Link to="/shippingmethod">(change)</Link><br />
                    Selected form of payment: <strong>{cart.paymentMethod}</strong> <Link to="/payment">(change)</Link><br />
                </Col>
                <Col lg={3} md={3} sm={12} xs={12}>
                    <h3>Summary</h3>
                    <strong>Items: </strong> {cart.itemsPrice.toFixed(2)} € <br />
                    <strong>Shipping: </strong> {cart.shippingPrice.toFixed(2)} € <br />
                    <strong>Tax: </strong> {cart.taxPrice.toFixed(2)} € <br />
                    <strong>Order Total: </strong> {cart.totalPrice.toFixed(2)} € <br />
                </Col>
            </Row>
            <Row>
                <Col>
                <CustomedButton
                        type="button"
                        class="full-width btn-weight margin-bottom"
                        variant="dark"
                    >Back</CustomedButton>
                </Col>
                <Col></Col>
                <Col></Col>
                <Col>
                    <CustomedButton
                        type="button"
                        onClick={placeOrderHandler}
                        class="full-width btn-weight margin-bottom"
                        variant="dark"
                        disabled={cart.cartItems.length === 0}
                    >Confirm</CustomedButton>
                </Col>
            </Row>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger margin-top">{error}</MessageBox>}
        </Container>
        </Fragment>
    )
}

export default PlaceOrderScreen;