import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import CustomedButton from '../../components/UI/CustomedButton';
import SettingsBox from '../../components/SettingsBox';

import { createBanner, deleteBanner, listBanners } from '../../actions/bannerActions';
import { BANNER_CREATE_RESET, BANNER_DELETE_RESET } from '../../constants/bannerConstants';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';


const BannerListScreen = (props) => {

  const bannerList = useSelector((state) => state.bannerList);
  const { loading, error, banners } = bannerList;

  const bannerCreate = useSelector((state) => state.bannerCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    banner: createdBanner,
  } = bannerCreate;

  const bannerDelete = useSelector((state) => state.bannerDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = bannerDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: BANNER_CREATE_RESET });
      props.history.push(`/settings/banner/${createdBanner._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: BANNER_DELETE_RESET });
    }
    dispatch(listBanners({}));
  }, [dispatch, successCreate, props.history, createdBanner, successDelete]);

  const deleteHandler = (banner) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteBanner(banner._id));
      props.history.push('/settings/bannerlist');
    }
  };

  const createHandler = () => {
    dispatch(createBanner());
  };

  return (
    <Container>
      <Row>
        <Col lg={12} md={12} sm={12} xs={12}>
          <Row className="breadcumber">
            <h6 className="breadcumber-box"><Link to="/">Home</Link></h6>
            <h6 className="breadcumber-box"><Link to="/settings">Settings</Link></h6>
            <h6 className="breadcumber-box"><Link to="/settings/bannerlist">Banner List</Link></h6>
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
              <h2 className="title-margin-bottom">Banners</h2>
            </Col>
            <Col className="to-the-right">
              <CustomedButton
                type="button"
                className="full-width"
                variant="outline-dark"
                onClick={createHandler}
              >
                Create Banner
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
                      <th>CATEGORY</th>
                      <th>SUBCATEGORY</th>
                      <th>LINK</th>
                      <th colspan="2">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {banners.map((banner) => (
                      <tr key={banner._id}>
                        <td>
                          <Card style={{ width: '3rem' }}>
                            <Card.Img variant="top" src={banner.image} />
                          </Card>
                        </td>
                        <td>{banner._id}</td>
                        <td>{banner.name}</td>
                        <td>{banner.category}</td>
                        <td>{banner.subcategory}</td>
                        <td>{banner.link}</td>
                        <td>
                          <CustomedButton
                            type="button"
                            className="full-width"
                            variant="outline-dark"
                            onClick={() =>
                              props.history.push(`/settings/banner/${banner._id}/edit`)
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
                            onClick={() => deleteHandler(banner)}
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

export default BannerListScreen;