import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { deleteUser, listUsers } from '../../actions/userActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { USER_DETAILS_RESET } from '../../constants/userConstants';
import CustomedButton from '../../components/UI/CustomedButton';

import Container from 'react-bootstrap/esm/Container';
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const UserListScreen = (props) => {

    const { pageNumber = 1 } = useParams();

    const userList = useSelector((state) => state.userList);
    const { loading, error, users, page, pages } = userList;

    const userDelete = useSelector((state) => state.userDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = userDelete;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listUsers({
            pageNumber,
        }));
        dispatch({
            type: USER_DETAILS_RESET,
        });
    }, [dispatch, successDelete, pageNumber]);
    const deleteHandler = (user) => {
        if (window.confirm('Are you sure to delete?')) {
            dispatch(deleteUser(user._id));
        }
    };

    return (
        <Container>
            <Row>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <Row className="breadcumber">
                        <h6 className="breadcumber-box"><Link to="/">Home</Link></h6>
                        <h6 className="breadcumber-box"><Link to="/userlist">User List</Link></h6>
                    </Row>
                </Col>
            </Row>
            <h2 className="title-margin-bottom">Users</h2>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {successDelete && (
                <MessageBox variant="success">User Deleted Successfully</MessageBox>
            )}
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                        <Table responsive="sm" striped bordered hover className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>IS ADMIN</th>
                                    <th colspan="2">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                                        <td>
                                            <CustomedButton
                                                type="button"
                                                className="full-width"
                                                variant="outline-dark"
                                                onClick={() => props.history.push(`/user/${user._id}/edit`)}
                                            >
                                                Edit
                                            </CustomedButton>
                                        </td>
                                        <td>
                                            <CustomedButton
                                                type="button"
                                                className="full-width"
                                                variant="dark"
                                                onClick={() => deleteHandler(user)}
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
                            to={`/userlist/pageNumber/${x + 1}`}
                        >
                            {x + 1}
                        </Link>
                    ))}
                </Col>
            </Row>
        </Container>
    )
}

export default UserListScreen;