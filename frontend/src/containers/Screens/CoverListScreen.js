import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteCover, createCover, listCovers } from '../../actions/coverActions';
import { COVER_CREATE_RESET, COVER_DELETE_RESET } from '../../constants/coverConstants';

import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import CustomedButton from '../../components/UI/CustomedButton';
import SettingsBox from '../../components/SettingsBox';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';


const CoverListScreen = (props) => {

  const coverList = useSelector((state) => state.coverList);
  const { loading, error, covers } = coverList;

  const coverCreate = useSelector((state) => state.coverCreate);
  const {
    loading: loadingCreate, 
    error: errorCreate,
    success: successCreate,
    cover: createdCover,
  } = coverCreate;

  const coverDelete = useSelector((state) => state.coverDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = coverDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: COVER_CREATE_RESET });
      props.history.push(`/settings/cover/${createdCover._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: COVER_DELETE_RESET });
    }
    dispatch(listCovers({}));
  }, [dispatch, successCreate, props.history, createdCover, successDelete]);

  const deleteHandler = (cover) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteCover(cover._id));
      props.history.push('/settings/coverlist');
    }
  };

  const createHandler = () => {
    dispatch(createCover());
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
          <h2 className="title-margin-bottom">Covers</h2>
        </Col>
        <Col className="to-the-right">
          <CustomedButton
            type="button"
            className="full-width"
            variant="outline-dark"
            onClick={createHandler}
          >
            Create Cover
                </CustomedButton>
        </Col>
      </Row>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
            <Table responsive="sm" striped bordered hover className="table">
              <thead>
                <tr>
                  <th>IMAGE</th>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>LINK</th>
                  <th colspan="2">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {covers.map((cover) => (
                  <tr key={cover._id}>
                    <td>
                      <Card style={{ width: '3rem' }}>
                        <Card.Img variant="top" src={cover.image} />
                      </Card>
                    </td>
                    <td>{cover._id}</td>
                    <td>{cover.name}</td>
                    <td>{cover.link}</td>
                    <td>
                      <CustomedButton
                        type="button"
                        className="full-width"
                        variant="outline-dark"
                        onClick={() =>
                          props.history.push(`/settings/cover/${cover._id}/edit`)
                        }
                      >
                        Edit
                    </CustomedButton>
                    </td>
                    <td>
                      <CustomedButton
                        type="button"
                        className="full-width"
                        variant="dark"
                        onClick={() => deleteHandler(cover)}
                      >
                        Delete
                    </CustomedButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>

    </Container>
  )
}

export default CoverListScreen;