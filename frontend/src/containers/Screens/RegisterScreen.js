import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import CustomedButton from '../../components/UI/CustomedButton';
import Input from '../../components/UI/Input';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/userActions';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'


const RegisterScreen = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const redirect = props.location.search 
    ? props.location.search.split('=')[1] 
    : '/';

    const userRegister = useSelector(state => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            alert("Passwords are not the same")
        } else {
            dispatch(register(name, email, password));
        }
    };

    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);

    return (
        <Container>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant='danger'>{error}</MessageBox>}
            <Form onSubmit={submitHandler} className="form-screens">
            <Col className="title-screens">
                <h1>Create Account</h1>
            </Col>
            <Col>
                <Input
                    element="input"
                    type="text"
                    id="name"
                    placeholder="Enter name..."
                    required
                    onChange={(e) => setName(e.target.value)}
                    label="Name"
                ></Input>
            </Col>
            <Col>
                <Input
                    element="input"
                    type="email"
                    id="email"
                    placeholder="Enter email..."
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    label="Email address"
                ></Input>
            </Col>
            <Col>
                <Input
                    element="input"
                    type="password"
                    id="password"
                    placeholder="Enter password..."
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    label="Password"
                ></Input>
            </Col>
            <Col>
                <Input
                    element="input"
                    type="password"
                    id="confirmPassword"
                    placeholder="Enter confirm password..."
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    label="Confirm password"
                ></Input>
            </Col>
            <Col>
                <CustomedButton variant="dark" type="submit" class="full-width margin-top margin-bottom btn-weight">Register</CustomedButton>
            </Col>
            <Col>
                Already have an account? {' '}
                <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
            </Col>
            </Form>
        </Container>
    )
}

export default RegisterScreen;