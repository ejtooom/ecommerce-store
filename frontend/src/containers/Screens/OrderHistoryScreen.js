import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { listOrderMine } from '../../actions/orderActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import CustomedButton from '../../components/UI/CustomedButton';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';


const OrderHistoryScreen = (props) => {

    const { pageNumber = 1 } = useParams();

    const orderMineList = useSelector((state) => state.orderMineList);
    const { loading, error, orders, page, pages } = orderMineList;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listOrderMine({
            pageNumber,
        }));
    }, [dispatch, pageNumber]);

    return (
        <Container>
            <Row>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <Row className="breadcumber">
                        <h6 className="breadcumber-box"><Link to="/">Home</Link></h6>
                        <h6 className="breadcumber-box"><Link to="/orderhistory">Order History</Link></h6>
                    </Row>
                </Col>
            </Row>
            <h2 className="title-margin-bottom">Order History</h2>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                        <Table responsive="sm" striped bordered hover className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
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
                                                variant="dark"
                                                onClick={() => {
                                                    props.history.push(`/order/${order._id}`);
                                                }}
                                            >
                                                Details
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
                            to={`/orderhistory/pageNumber/${x + 1}`}
                        >
                            {x + 1}
                        </Link>
                    ))}
                </Col>
            </Row>
        </Container>
    )
}

export default OrderHistoryScreen;