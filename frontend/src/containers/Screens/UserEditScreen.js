import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { USER_UPDATE_RESET } from '../../constants/userConstants';
import { detailsUser, updateUser } from '../../actions/userActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import Input from '../../components/UI/Input';
import CustomedButton from '../../components/UI/CustomedButton';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'


const UserEditScreen = (props) => {

    const userId = props.match.params.id;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSeller, setIsSeller] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = userUpdate;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            props.history.push('/userlist');
        }
        if (!user) {
            dispatch(detailsUser(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
        }
    }, [dispatch, props.history, successUpdate, user, userId]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ _id: userId, name, email, isSeller, isAdmin }));
    };


    return (
        <Container>
            <Row>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <Row className="breadcumber">
                        <h6 className="breadcumber-box"><Link to="/">Home</Link></h6>
                        <h6 className="breadcumber-box"><Link to="/userlist">User List</Link></h6>
                        <h6 className="breadcumber-box"><Link>Edit User</Link></h6>
                    </Row>
                </Col>
            </Row>
            <Form className="form-screens" onSubmit={submitHandler}>
                <Col>
                    <h2>Edit User {name}</h2>
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && (
                        <MessageBox variant="danger">{errorUpdate}</MessageBox>
                    )}
                </Col>
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                            <Fragment>
                                <Col>
                                    <Input
                                        element="input"
                                        type="text"
                                        id="name"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        label="Name"
                                    ></Input>
                                </Col>
                                <Col>
                                    <Input
                                        element="input"
                                        type="email"
                                        id="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        label="Email"
                                    ></Input>
                                </Col>
                                <Col>
                                    <Input
                                        type="checkbox"
                                        id="isSeller"
                                        checked={isSeller}
                                        value={isSeller}
                                        onChange={(e) => setIsSeller(e.target.value)}
                                        labelRadio="isSeller"
                                    ></Input>
                                </Col>
                                <Col>
                                    <Input
                                        type="checkbox"
                                        id="isAdmin"
                                        value={isAdmin}
                                        checked={isAdmin}
                                        onChange={(e) => setIsAdmin(e.target.value)}
                                        labelRadio="isAdmin"
                                    ></Input>
                                </Col>
                                <Col>
                                    <CustomedButton variant="dark" class="full-width margin-top" type="submit">
                                        Update
                </CustomedButton>
                                </Col>
                            </Fragment>
                        )}
            </Form>
        </Container>
    )
}

export default UserEditScreen;