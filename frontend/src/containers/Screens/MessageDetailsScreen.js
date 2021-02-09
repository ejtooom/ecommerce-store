import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import CustomedButton from '../../components/UI/CustomedButton';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';

import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';
import { detailsContactForm } from '../../actions/contactFormActions';


const MessageDetailsScreen = (props) => {

  const contactFormId = props.match.params.id;

  const contactFormDetails = useSelector((state) => state.contactFormDetails);
  const { loading, error, contactForm } = contactFormDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsContactForm(contactFormId));
  }, [dispatch, contactFormId]);

  return (
    <Container>
      <Row>
        <Col lg={12} md={12} sm={12} xs={12}>
          <Row className="breadcumber">
            <h6 className="breadcumber-box"><Link to="/">Home</Link></h6>
            <h6 className="breadcumber-box"><Link to="/admin-messagelist">Messages box</Link></h6>
            <h6 className="breadcumber-box"><Link to="">{contactFormId}</Link></h6>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col lg={9} md={12} lg={{ order: 'first'}}>
          <h3 className="message-title">Message: {contactFormId} </h3>
        </Col>
        <Col lg={3} md={12} md={{ order: 'first'}} sm={{ order: 'first'}} xs={{ order: 'first'}} className="to-the-right">
          <CustomedButton
            type="button"
            class="full-width message-box-btn"
            variant="outline-dark"
            to="/admin-messagelist"
          >
            Back to message box
                </CustomedButton>
        </Col>
      </Row>
      <Col className="message-screen">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
              <Fragment>
                <Col className="message-box" lg={12}>
                  <h5 className="display-inline">Name:</h5>
                  <p className="display-inline">{contactForm.name}</p>
                </Col>
                <Col className="message-box" lg={12}>
                  <h5 className="display-inline">Email:</h5>
                  <p className="display-inline">{contactForm.email}</p>
                </Col>
                <Col className="message-box" lg={12}>
                  <h5 className="display-inline">Title:</h5>
                  <p className="display-inline">{contactForm.title}</p>
                </Col>
                <Col className="message-box" lg={12}>
                  <h5>Message:</h5>
                  <p>{contactForm.text}</p>
                </Col>
              </Fragment>
            )}
      </Col>
    </Container>
  )
}

export default MessageDetailsScreen;