import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NEWSLETTER_CREATE_RESET } from '../constants/newsletterConstants';

import CustomedButton from './UI/CustomedButton';
import { createNewsletter } from '../actions/newsletterActions';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';


const Newsletter = (props) => {

    const [email, setEmail] = useState('');
    const [confirm, setConfirm] = useState(false);

    const newsletterCreate = useSelector((state) => state.newsletterCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        newsletter: createdNewsletter,
      } = newsletterCreate;

    const dispatch = useDispatch();

        useEffect(() => {
        if (successCreate) {
            dispatch({ type: NEWSLETTER_CREATE_RESET });
        }
    }, [dispatch, successCreate, props.history, createdNewsletter]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (!confirm) {
          alert('You must accept privacy policy');
        } else {
          dispatch(createNewsletter(email));
          setEmail("");
        }
      };

    return (
        <Fragment>
            <Col className={`newsletter-box ${props.className}`}>
                <Form onSubmit={submitHandler}>
                    <h3>NEWSLETTER</h3>
                    <p>Subscribe to our newsletter to receive our news and promotions.</p>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control 
                        type="email" 
                        placeholder="Enter your email address..."
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="newsletter-input"
                        />
                        <CustomedButton variant="dark" type="submit" class="btn-weight">
                            SUBSCRIBE
                        </CustomedButton>
                        <Form.Check 
                            type="checkbox" 
                            label="I have read and accept the privacy policy." 
                            id="confirm" 
                            value={confirm} 
                            onChange={(e) => setConfirm(e.target.value)}
                            />
                    </Form.Group>
                </Form>
            </Col>
    </Fragment>
    )
}

export default Newsletter;