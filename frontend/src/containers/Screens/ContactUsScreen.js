import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import InfoBox from '../../components/InfoBox';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { createContactForm } from '../../actions/contactFormActions';
import { CONTACTFORM_CREATE_RESET } from '../../constants/contactFormConstants';
import { listInfoBoxes } from '../../actions/infoBoxActions';
import Input from '../../components/UI/Input';
import CustomedButton from '../../components/UI/CustomedButton';
import Newsletter from '../../components/Newsletter';


const ContactUsScreen = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const infoBoxList = useSelector(state => state.infoBoxList);
    const { loading: loadingInfoBox, error: errorInfoBox, infoBoxes } = infoBoxList;

    const contactFormCreate = useSelector((state) => state.contactFormCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        contactForm: createdContactForm,
    } = contactFormCreate;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successCreate) {
            dispatch({ type: CONTACTFORM_CREATE_RESET });
        }
    }, [dispatch, successCreate, props.history, createdContactForm]);

    useEffect(() => {
        dispatch(listInfoBoxes());
    }, [dispatch]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createContactForm(name, email, title, text));
        setName("");
        setEmail("");
        setTitle("");
        setText("");
    };

    return (
        <Container>
            <Row>
                <Col lg={3}>
                    <Row>
                        <Col lg={12} md={12} sm={12} xs={12}>
                        </Col>
                    </Row>

                </Col>
                <Col lg={9} md={12} sm={12} xs={12}>
                    <Row className="breadcumber">
                        <h6 className="breadcumber-box"><Link to="/">Home</Link></h6>
                        <h6 className="breadcumber-box"><Link to="/contact-us">Contact us</Link></h6>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col lg={3} md={12} className="infobox-hide">
                    {loadingInfoBox ? (
                        <LoadingBox></LoadingBox>
                    ) : errorInfoBox ? (
                        <MessageBox variant="danger">{errorInfoBox}</MessageBox>
                    ) : (
                                <Row>
                                    {infoBoxes.map(infoBox => {
                                        return (
                                            <InfoBox key={infoBox._id} infoBox={infoBox} />
                                        )
                                    })}
                                </Row>
                            )}
                </Col>
                <Col lg={9} className="top-margin">
                    <h3>Contact Us</h3>
                    <br />
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                    in culpa qui officia deserunt mollit anim id est laborum."</p>
                    <Form className="form-screens contact-us-form" onSubmit={submitHandler}>
                        <Col>
                            <Input
                                element="input"
                                type="text"
                                id="fullName"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                label="Name"
                            ></Input>
                        </Col>
                        <Col>
                            <Input
                                element="input"
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                label="Email"
                            ></Input>
                        </Col>
                        <Col>
                            <Input
                                element="input"
                                type="text"
                                id="title"
                                placeholder="Enter title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                label="Title"
                            ></Input>
                        </Col>
                        <Col>
                            <Input
                                element="textarea"
                                type="textarea"
                                id="text"
                                placeholder=""
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                required
                                label="Text"
                            ></Input>
                        </Col>
                        <Col>
                            <CustomedButton
                                variant="dark"
                                class="full-width margin-top btn-weight"
                                type="submit"
                            >
                                Send
                            </CustomedButton>
                        </Col>
                        <Col>
                            {loadingCreate && <LoadingBox></LoadingBox>}
                            {errorCreate && (
                                <MessageBox variant="danger margin-top">{errorCreate}</MessageBox>
                            )}
                            {successCreate && (
                                <MessageBox variant="success margin-top">
                                    Sent
                                </MessageBox>
                            )}
                        </Col>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Newsletter />
            </Row>
        </Container>

    )
}

export default ContactUsScreen;