import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import CustomedButton from '../../components/UI/CustomedButton';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { CONTACTFORM_DELETE_RESET } from '../../constants/contactFormConstants';
import { deleteContactForm, listContactForms } from '../../actions/contactFormActions';


const AdminMessageListScreen = (props) => {

  const { pageNumber = 1 } = useParams();

  const contactFormList = useSelector((state) => state.contactFormList);
  const { loading, error, contactForms, page, pages } = contactFormList;

  const contactFormDelete = useSelector((state) => state.contactFormDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = contactFormDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: CONTACTFORM_DELETE_RESET });
    }
    dispatch(listContactForms({
      pageNumber,
    }));
  }, [dispatch, successDelete, pageNumber]);

  const deleteHandler = (contactForm) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteContactForm(contactForm._id));
      props.history.push('/admin-messagelist');
    }
  };

  return (
    <Container>
      <Row>
        <Col lg={12} md={12} sm={12} xs={12}>
          <Row className="breadcumber">
            <h6 className="breadcumber-box"><Link to="/">Home</Link></h6>
            <h6 className="breadcumber-box"><Link to="/admin-messagelist">Messages</Link></h6>
          </Row>
        </Col>
      </Row>
      <h3 className="title-margin-bottom">Messages</h3>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
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
                  <th>TITLE</th>
                  <th colspan="2">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {contactForms.map((contactForm) => (
                  <tr key={contactForm._id}>
                    <td>{contactForm._id}</td>
                    <td>{contactForm.name}</td>
                    <td>{contactForm.title}</td>
                    <td>
                      <CustomedButton
                        type="button"
                        className="full-width"
                        variant="outline-dark"
                        onClick={() => {
                          props.history.push(`/message/${contactForm._id}`);
                        }}
                      >
                        Details
                            </CustomedButton>
                    </td>
                    <td>
                      <CustomedButton
                        type="button"
                        className="full-width"
                        variant="dark"
                        onClick={() => deleteHandler(contactForm)}
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
              to={`/admin-messagelist/pageNumber/${x + 1}`}
            >
              {x + 1}
            </Link>
          ))}
        </Col>
      </Row>
    </Container>
  )
}

export default AdminMessageListScreen;