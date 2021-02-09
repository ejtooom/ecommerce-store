import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listOrders, deleteOrder } from '../../actions/orderActions';


import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import CustomedButton from '../../components/UI/CustomedButton';
import { ORDER_DELETE_RESET } from '../../constants/orderConstants';

import Container from 'react-bootstrap/esm/Container';
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const OrderListScreen = (props) => {

    const { pageNumber = 1 } = useParams();

    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders, page, pages } = orderList;

    const orderDelete = useSelector((state) => state.orderDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = orderDelete;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: ORDER_DELETE_RESET });
        dispatch(listOrders({
            pageNumber,
        }));
    }, [dispatch, successDelete, pageNumber]);

    const deleteHandler = (order) => {
        if (window.confirm('Are you sure to delete?')) {
            dispatch(deleteOrder(order._id));
        }
    };

    return (
        <Container>
            <Row>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <Row className="breadcumber">
                        <h6 className="breadcumber-box"><Link to="/">Home</Link></h6>
                        <h6 className="breadcumber-box"><Link to="/orderlist">Order List</Link></h6>
                    </Row>
                </Col>
            </Row>
            <h2 className="title-margin-bottom">Orders</h2>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                        <Table responsive="sm" striped bordered hover className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USER</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th colspan="2">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user.name}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.totalPrice.toFixed(2)}</td>
                                        <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                                        <td>
                                            {order.isDelivered
                                                ? order.deliveredAt.substring(0, 10)
                                                : 'No'}
                                        </td>
                                        <td>
                                            <CustomedButton
                                                type="button"
                                                className="full-width"
                                                variant="outline-dark"
                                                onClick={() => {
                                                    props.history.push(`/order/${order._id}`);
                                                }}
                                            >
                                                Details
                            </CustomedButton>
                                        </td>
                                        <td>
                                            <CustomedButton
                                                type="button"
                                                className="full-width"
                                                variant="dark"
                                                onClick={() => deleteHandler(order)}
                                            >
                                                Delete
                            </CustomedButton>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
            <Row>
                <Col className="pagination">
                    {[...Array(pages).keys()].map((x) => (
                        <Link
                            className={x + 1 === page ? 'active' : ''}
                            key={x + 1}
                            to={`/orderlist/pageNumber/${x + 1}`}
                        >
                            {x + 1}
                        </Link>
                    ))}
                </Col>
            </Row>
        </Container>
    )
}

export default OrderListScreen;