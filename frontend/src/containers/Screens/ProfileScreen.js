import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { detailsUser, updateUserProfile } from '../../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import Input from '../../components/UI/Input';
import CustomedButton from '../../components/UI/CustomedButton';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';

import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form'
import AccountDetailsBox from '../../components/AccountDetailsBox';


const ProfileScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const {
        success: successUpdate,
        error: errorUpdate,
        loading: loadingUpdate,
    } = userUpdateProfile;

    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
            dispatch(detailsUser(userInfo._id));
        } else {
            setName(user.name);
            setEmail(user.email);
        }
    }, [dispatch, userInfo._id, user]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Password and Confirm Password Are Not Matched');
        } else {
            dispatch(
                updateUserProfile({
                    userId: user._id,
                    name,
                    email,
                    password,
                })
            );
        }
    };

    return (
        <Container>
            <Row>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <Row className="breadcumber">
                        <h6 className="breadcumber-box"><Link to="/">Home</Link></h6>
                        <h6 className="breadcumber-box"><Link to="/accountdetails">Account details</Link></h6>
                        <h6 className="breadcumber-box"><Link to="/accountdetails/userprofile">User profile</Link></h6>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col lg={3}>
                    <AccountDetailsBox />
                </Col>
                <Col lg={9}>
                    <Form className="form-screens" onSubmit={submitHandler}>
                        <Col>
                            <h2>User Profile</h2>
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
                                                element="input"
                                                type="password"
                                                id="password"
                                                placeholder="Enter password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                label="Password"
                                            ></Input>
                                        </Col>
                                        <Col>
                                            <Input
                                                element="input"
                                                type="password"
                                                id="confirmPassword"
                                                placeholder="Enter password again"
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                label="Confirm Password"
                                            ></Input>
                                        </Col>
                                        <Col>
                                            <CustomedButton variant="dark" class="full-width margin-top margin-bottom" type="submit">
                                                Update
                    </CustomedButton>
                                        </Col>
                                        <Col>
                                            {loadingUpdate && <LoadingBox></LoadingBox>}
                                            {errorUpdate && (
                                                <MessageBox variant="danger">{errorUpdate}</MessageBox>
                                            )}
                                            {successUpdate && (
                                                <MessageBox variant="success margin-top">
                                                    Updated
                                                </MessageBox>
                                            )}
                                        </Col>
                                    </Fragment>
                                )}
                    </Form>
                </Col>
            </Row>


        </Container>

    )
}

export default ProfileScreen;