import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';

import { deliverOrder, detailsOrder, payOrder } from '../../actions/orderActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import CustomedButton from '../../components/UI/CustomedButton';
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../../constants/orderConstants';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';


const OrderScreen = (props) => {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

  const dispatch = useDispatch();

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, sdkReady, successPay, successDeliver, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  return (
    loading ? (
      <LoadingBox></LoadingBox>
    ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
    ) : (
          <Container>
            <Row>
              <Col lg={12} md={12} sm={12} xs={12}>
                <Row className="breadcumber">
                  <h6 className="breadcumber-box"><Link to="/">Home</Link></h6>
                  <h6 className="breadcumber-box"><Link to="/orderlist">Order List</Link></h6>
                  <h6 className="breadcumber-box"><Link to={`/order/${orderId}`}>Order: {orderId}</Link></h6>
                </Row>
              </Col>
            </Row>
            <br />
            {order.isPaid ? (
              <MessageBox variant="success">
                Paid at {order.paidAt}
              </MessageBox>
            ) : (
                <MessageBox variant="danger">Not Paid</MessageBox>
              )}
            {order.isDelivered ? (
              <MessageBox variant="success">
                Delivered at {order.deliveredAt}
              </MessageBox>
            ) : (
                <MessageBox variant="danger">Not Delivered</MessageBox>
              )}
            <br />
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
            {order.orderItems.map((item) => (
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
                {order.shippingAddress.fullName} <br />
                {order.shippingAddress.address} <br />
                {order.shippingAddress.city} <br />
                {order.shippingAddress.postalCode} <br />
                {order.shippingAddress.country} <br />
                {order.shippingAddress.number} <br />
              </Col>
              <Col lg={3} md={3} sm={12} xs={12}>
                <h3>Invoice Address</h3>
                {order.invoiceAddress.fullName} <br />
                {order.invoiceAddress.companyName} <br />
                {order.invoiceAddress.companyNumber} <br />
                {order.invoiceAddress.address} <br />
                {order.invoiceAddress.city} <br />
                {order.invoiceAddress.postalCode} <br />
                {order.invoiceAddress.country} <br />
                {order.invoiceAddress.number} <br />
              </Col>
              <Col lg={3} md={3} sm={12} xs={12}>
                <h3>Info</h3>
                    Selected form of delivery: <strong>{order.shippingMethod}</strong> <br />
                    Wybrana forma płatności: <strong>{order.paymentMethod}</strong> <br />
              </Col>
              <Col lg={3} md={3} sm={12} xs={12}>
                <h3>Summary</h3>
                <strong>Items: </strong> {order.itemsPrice.toFixed(2)} € <br />
                <strong>Shipping: </strong> {order.shippingPrice.toFixed(2)} € <br />
                <strong>Tax: </strong> {order.taxPrice.toFixed(2)} € <br />
                <strong>Order Total: </strong> {order.totalPrice.toFixed(2)} € <br />
              </Col>
            </Row>
            <Row>
              {!order.isPaid && (
                <Col md={{ span: 6, offset: 6 }}>
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                      <>
                        {errorPay && (
                          <MessageBox variant="danger">{errorPay}</MessageBox>
                        )}
                        {loadingPay && <LoadingBox></LoadingBox>}

                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={successPaymentHandler}
                        ></PayPalButton>
                      </>
                    )}
                </Col>
              )}
            </Row>
            {userInfo.isAdmin && !order.isDelivered && (
              <Col md={{ span: 6, offset: 6 }}>
                {loadingDeliver && <LoadingBox></LoadingBox>}
                {errorDeliver && (
                  <MessageBox variant="danger">{errorDeliver}</MessageBox>
                )}
                <CustomedButton
                  type="button"
                  class="full-width btn-weight margin-top"
                  variant="dark"
                  onClick={deliverHandler}
                >
                  Deliver Order
                  </CustomedButton>
              </Col>
            )}
            <Row>

            </Row>
          </Container>
        ))
}

export default OrderScreen;