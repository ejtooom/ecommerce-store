import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import CustomedButton from '../../components/UI/CustomedButton';
import SettingsBox from '../../components/SettingsBox';
import { ADVERTISING_BOX_CREATE_RESET, ADVERTISING_BOX_DELETE_RESET } from '../../constants/advertisingBoxConstants';
import { createAdvertisingBox, deleteAdvertisingBox, listAdvertisingBoxes } from '../../actions/advertisingBoxActions';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';


const AdvertisingBoxListScreen = (props) => {

  const advertisingBoxList = useSelector((state) => state.advertisingBoxList);
  const { loading, error, advertisingBoxes } = advertisingBoxList;

  const advertisingBoxCreate = useSelector((state) => state.advertisingBoxCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    advertisingBox: createdAdvertisingBox,
  } = advertisingBoxCreate;

  const advertisingBoxDelete = useSelector((state) => state.advertisingBoxDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = advertisingBoxDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: ADVERTISING_BOX_CREATE_RESET });
      props.history.push(`/settings/advertisingbox/${createdAdvertisingBox._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: ADVERTISING_BOX_DELETE_RESET });
    }
    dispatch(listAdvertisingBoxes({}));
  }, [dispatch, successCreate, props.history, createdAdvertisingBox, successDelete]);

  const deleteHandler = (advertisingBox) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteAdvertisingBox(advertisingBox._id));
      props.history.push('/settings/advertisingboxlist');
    }
  };

  const createHandler = () => {
    dispatch(createAdvertisingBox());
  };

  return (
    <Container>
      <Row>
        <Col lg={12} md={12} sm={12} xs={12}>
          <Row className="breadcumber">
            <h6 className="breadcumber-box"><Link to="/">Home</Link></h6>
            <h6 className="breadcumber-box"><Link to="/settings">Settings</Link></h6>
            <h6 className="breadcumber-box"><Link to="/settings/advertisingboxlist">Advertising Box List</Link></h6>
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
              <h2 className="title-margin-bottom">Advertising Boxes</h2>
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
                      <th>IMAGE</th>
                      <th>ID</th>
                      <th>NAME</th>
                      <th>LINK</th>
                      <th colspan="2">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {advertisingBoxes.map((box) => (
                      <tr key={box._id}>
                        <td>
                          <Card style={{ width: '3rem' }}>
                            <Card.Img variant="top" src={box.image} />
                          </Card>
                        </td>
                        <td>{box._id}</td>
                        <td>{box.name}</td>
                        <td>{box.link}</td>
                        <td>
                          <CustomedButton
                            type="button"
                            className="full-width"
                            variant="outline-dark"
                            onClick={() =>
                              props.history.push(`/settings/advertisingbox/${box._id}/edit`)
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
                            onClick={() => deleteHandler(box)}
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

export default AdvertisingBoxListScreen;