import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { deleteRecommendedCategory, createRecommendedCategory, listRecommendedCategories } from '../../actions/recommendedCategoryActions';
import CustomedButton from '../../components/UI/CustomedButton';
import SettingsBox from '../../components/SettingsBox';
import { RECOMMENDED_CATEGORY_CREATE_RESET, RECOMMENDED_CATEGORY_DELETE_RESET } from '../../constants/recommendedCategoryConstants';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';


const RecommendedCategoryListScreen = (props) => {

  const recommendedCategoryList = useSelector((state) => state.recommendedCategoryList);
  const { loading, error, recommendedCategories } = recommendedCategoryList;

  const recommendedCategoryCreate = useSelector((state) => state.recommendedCategoryCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    recommendedCategory: createdRecommendedCategory,
  } = recommendedCategoryCreate;

  const recommendedCategoryDelete = useSelector((state) => state.recommendedCategoryDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = recommendedCategoryDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: RECOMMENDED_CATEGORY_CREATE_RESET });
      props.history.push(`/settings/recommendedcategory/${createdRecommendedCategory._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: RECOMMENDED_CATEGORY_DELETE_RESET });
    }
    dispatch(listRecommendedCategories({}));
  }, [dispatch, successCreate, props.history, createdRecommendedCategory, successDelete]);

  const deleteHandler = (recommendedCategory) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteRecommendedCategory(recommendedCategory._id));
      props.history.push('/settings/recommendedcategorylist');
    }
  };

  const createHandler = () => {
    dispatch(createRecommendedCategory());
  };

  return (
    <Container>
      <Row>
        <Col lg={12} md={12} sm={12} xs={12}>
          <Row className="breadcumber">
            <h6 className="breadcumber-box"><Link to="/">Home</Link></h6>
            <h6 className="breadcumber-box"><Link to="/settings">Settings</Link></h6>
            <h6 className="breadcumber-box"><Link to="/settings/recommendedcategorylist">Recommended Categories List</Link></h6>
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
              <h2 className="title-margin-bottom">Recommended Categories</h2>
            </Col>
            <Col className="to-the-right">
              <CustomedButton
                type="button"
                className="full-width"
                variant="outline-dark"
                onClick={createHandler}
              >
                Create Category
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
                    {recommendedCategories.map((category) => (
                      <tr key={category._id}>
                        <td>
                          <Card style={{ width: '3rem' }}>
                            <Card.Img variant="top" src={category.image} />
                          </Card>
                        </td>
                        <td>{category._id}</td>
                        <td>{category.name}</td>
                        <td>{category.link}</td>
                        <td>
                          <CustomedButton
                            type="button"
                            className="full-width"
                            variant="outline-dark"
                            onClick={() =>
                              props.history.push(`/settings/recommendedcategory/${category._id}/edit`)
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
                            onClick={() => deleteHandler(category)}
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

export default RecommendedCategoryListScreen;