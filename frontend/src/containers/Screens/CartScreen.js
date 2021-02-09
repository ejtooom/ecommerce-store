import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { addToCart, removeFromCart } from '../../actions/cartActions';
import CustomedButton from '../../components/UI/CustomedButton';
import MessageBox from '../../components/MessageBox';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';


const CartScreen = (props) => {

    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const dispatch = useDispatch();

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping');
    };

    return (
        <Container>
            <Row>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <Row className="breadcumber">
                        <h6 className="breadcumber-box"><Link to="/">Home</Link></h6>
                        <h6 className="breadcumber-box"><Link to="/cart">Cart</Link></h6>
                    </Row>
                </Col>
            </Row>
            <Fragment>
                {cartItems.length === 0 ? (
                    <MessageBox>
                        Car is empty <Link to="/">Go Shopping</Link>
                    </MessageBox>
                ) : (
                        <Fragment>
                            <Row className="cart-item-header hide-medium">
                                <Col lg={2} className="cart-details-header">
                                </Col>
                                <Col lg={2} className="cart-details-header">
                                    PRODUCT
                                            </Col>
                                <Col className="cart-details-header">
                                    QUANTITY
                                            </Col>
                                <Col className="cart-details-header">
                                    PRICE
                                            </Col>
                                <Col lg={2} className="cart-details-header">
                                </Col>
                            </Row>
                            {cartItems.map((item) => (
                                <Row className="cart-item" key={item.product}>
                                    <Col lg={2} md={6} sm={6} xs={6}>
                                        <Card style={{ width: '6rem' }}>
                                            <Card.Img variant="top" src={item.image} />
                                        </Card>
                                    </Col>
                                    <Col lg={2} md={6} sm={6} xs={6} className="cart-details">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col className="cart-details">
                                        <Form.Group controlId="exampleForm.ControlSelect1">
                                            <Form.Control as="select" value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                {[...Array(item.countInStock).keys()].map(
                                                    (x) => (
                                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                    )
                                                )}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col className="cart-details">
                                        {item.price} PLN
                                            </Col>
                                    <Col lg={2} md={12} sm={12} className="cart-details">
                                        <CustomedButton variant='dark' size="lg" class="full-width" onClick={() => removeFromCartHandler(item.product)}>
                                            Delete
                                        </CustomedButton>
                                    </Col>
                                </Row>
                            ))
                            }
                        </Fragment>
                    )}
                <Row className="cart-details-total">
                    <Col lg={12} md={12} sm={12} xs={12}>
                        <h4>Total ({cartItems.reduce((a, c) => a + c.qty, 0)} items): {' '}
                            {cartItems.reduce((a, c) => a + c.price * c.qty, 0)} PLN</h4>
                    </Col>
                    <Col className="col-no-padding" lg={12} md={12} sm={12} xs={12}>
                        <CustomedButton variant='dark' size="lg" class="full-width btn-weight" onClick={checkoutHandler} disabled={cartItems.length === 0}>
                            Proceed to checkout
                        </CustomedButton>
                    </Col>
                </Row>
            </Fragment>
        </Container>
    )
}

export default CartScreen;