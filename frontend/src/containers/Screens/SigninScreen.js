import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import CustomedButton from '../../components/UI/CustomedButton';
import Input from '../../components/UI/Input';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../actions/userActions';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'


const SigninScreen = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = props.location.search 
    ? props.location.search.split('=')[1] 
    : '/';

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
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
                <h1>Sign In</h1>
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
                <CustomedButton variant="dark" type="submit" class="full-width margin-top margin-bottom btn-weight">Sign In</CustomedButton>
            </Col>
            <Col className="">
                New customer? {' '}
                <Link to={`/register?redirect=${redirect}`}>Create your account</Link>
            </Col>
            </Form>
        </Container>
    )
}

export default SigninScreen;