import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import CustomedButton from '../../components/UI/CustomedButton';
import { INFOBOX_CREATE_RESET, INFOBOX_DELETE_RESET } from '../../constants/infoBoxConstants';
import { createInfoBox, deleteInfoBox, listInfoBoxes } from '../../actions/infoBoxActions';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import SettingsBox from '../../components/SettingsBox';


const InfoBoxListScreen = (props) => {

  const infoBoxList = useSelector((state) => state.infoBoxList);
  const { loading, error, infoBoxes } = infoBoxList;

  const infoBoxCreate = useSelector((state) => state.infoBoxCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    infoBox: createdInfoBox,
  } = infoBoxCreate;

  const infoBoxDelete = useSelector((state) => state.infoBoxDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = infoBoxDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: INFOBOX_CREATE_RESET });
      props.history.push(`/settings/infobox/${createdInfoBox._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: INFOBOX_DELETE_RESET });
    }
    dispatch(listInfoBoxes({}));
  }, [dispatch, successCreate, props.history, createdInfoBox, successDelete]);

  const deleteHandler = (infoBox) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteInfoBox(infoBox._id));
      props.history.push('/settings/infoboxlist');
    }
  };

  const createHandler = () => {
    dispatch(createInfoBox());
  };

  return (
    <Container>
      <Row>
        <Col lg={12} md={12} sm={12} xs={12}>
          <Row className="breadcumber">
            <h6 className="breadcumber-box"><Link to="/">Home</Link></h6>
            <h6 className="breadcumber-box"><Link to="/settings">Settings</Link></h6>
            <h6 className="breadcumber-box"><Link to="/settings/infoboxlist">Info Box List</Link></h6>
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
            <h2 className="title-margin-bottom">Info Boxes</h2>
          </Col>
          <Col className="to-the-right">
            <CustomedButton
              type="button"
              className="full-width"
              variant="outline-dark"
              onClick={createHandler}
            >
              Create Box
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
                    <th>ID</th>
                    <th>NAME</th>
                    <th>TITLE</th>
                    <th>TEXT</th>
                    <th>LINK</th>
                    <th colspan="2">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {infoBoxes.map((infoBox) => (
                    <tr key={infoBox._id}>
                      <td>{infoBox._id}</td>
                      <td>{infoBox.name}</td>
                      <td>{infoBox.title}</td>
                      <td>{infoBox.text}</td>
                      <td>{infoBox.link}</td>
                      <td>
                        <CustomedButton
                          type="button"
                          className="full-width"
                          variant="outline-dark"
                          onClick={() =>
                            props.history.push(`/settings/infobox/${infoBox._id}/edit`)
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
                          onClick={() => deleteHandler(infoBox)}
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

export default InfoBoxListScreen;