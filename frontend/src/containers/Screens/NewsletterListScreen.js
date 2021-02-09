import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import CustomedButton from '../../components/UI/CustomedButton';
import SettingsBox from '../../components/SettingsBox';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { NEWSLETTER_DELETE_RESET } from '../../constants/newsletterConstants';
import { deleteNewsletter, listNewsletters } from '../../actions/newsletterActions';
import Input from '../../components/UI/Input';


const NewsletterListScreen = (props) => {

  const newsletterList = useSelector((state) => state.newsletterList);
  const { loading, error, newsletters } = newsletterList;

  const newsletterDelete = useSelector((state) => state.newsletterDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = newsletterDelete;

  const [email, setEmail] = useState('');
  const [foundEmail, setFoundEmail] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    setFoundEmail(email);
  }

  const dispatch = useDispatch();

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: NEWSLETTER_DELETE_RESET });
    }
    dispatch(listNewsletters({}));
  }, [dispatch, props.history, successDelete]);

  const deleteHandler = (newsletter) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteNewsletter(newsletter._id));
      props.history.push('/settings/newsletterlist');
    }
  };

  return (
    <Container>
      <Row>
        <Col lg={12} md={12} sm={12} xs={12}>
          <Row className="breadcumber">
            <h6 className="breadcumber-box"><Link to="/">Home</Link></h6>
            <h6 className="breadcumber-box"><Link to="/settings">Settings</Link></h6>
            <h6 className="breadcumber-box"><Link to="/settings/coverlist">Cover List</Link></h6>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col lg={3}>
          <SettingsBox />
        </Col>
        <Col lg={9} className="setting-margin-top">
          <Row>
            <Col>
              <h2 className="title-margin-bottom">List of Emails</h2>
            </Col>
          </Row>
          <Form className="form-screens" onSubmit={submitHandler}>
            <Col>
              <Input
                element="input"
                type="email"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
            </Col>
            <Col>
              <CustomedButton
                type="submit"
                class="full-width margin-top btn-weight"
                variant="dark"
              >
                Check
                </CustomedButton>
            </Col>
          </Form>
          {loadingDelete && <LoadingBox></LoadingBox>}
          {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
                <Table responsive="sm" striped bordered hover className="table table-top-margin">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>EMAIL</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newsletters.map((newsletter) => {
                      if (foundEmail === newsletter.email) {
                        return (
                          <tr key={newsletter._id}>
                            <td>{newsletter._id}</td>
                            <td>{newsletter.email}</td>
                            <td>
                              <CustomedButton
                                type="button"
                                className="full-width"
                                variant="dark"
                                onClick={() => deleteHandler(newsletter)}
                              >
                                Delete
                    </CustomedButton>
                            </td>
                          </tr>
                        )
                      }
                    })}
                  </tbody>
                </Table>
              )}
        </Col>
      </Row>

    </Container>
  )
}

export default NewsletterListScreen;