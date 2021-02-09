import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import { detailsRecommendedCategory, updateRecommendedCategory } from '../../actions/recommendedCategoryActions';
import { RECOMMENDED_CATEGORY_UPDATE_RESET } from '../../constants/recommendedCategoryConstants';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import CustomedButton from '../../components/UI/CustomedButton';

import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Input from '../../components/UI/Input';
import Container from 'react-bootstrap/esm/Container';


const RecommendedCategoryEditScreen = (props) => {

  const recommendedCategoryId = props.match.params.id;
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState('');

  const recommendedCategoryDetails = useSelector((state) => state.recommendedCategoryDetails);
  const { loading, error, recommendedCategory } = recommendedCategoryDetails;

  const recommendedCategoryUpdate = useSelector((state) => state.recommendedCategoryUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = recommendedCategoryUpdate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      props.history.push('/settings/recommendedcategory');
    }
    if (!recommendedCategory || recommendedCategory._id !== recommendedCategoryId || successUpdate) {
      dispatch({ type: RECOMMENDED_CATEGORY_UPDATE_RESET });
      dispatch(detailsRecommendedCategory(recommendedCategoryId));
    } else {
      setName(recommendedCategory.name);
      setLink(recommendedCategory.link);
      setImage(recommendedCategory.image);
    }
  }, [recommendedCategory, dispatch, recommendedCategoryId, props.history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateRecommendedCategory({
        _id: recommendedCategoryId,
        name,
        link,
        image,
      })
    );
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <Container>
      <Row>
        <Col lg={12} md={12} sm={12} xs={12}>
          <Row className="breadcumber">
            <h6 className="breadcumber-box"><Link to="/">Home</Link></h6>
            <h6 className="breadcumber-box"><Link to="/settings">Settings</Link></h6>
            <h6 className="breadcumber-box"><Link to="/settings/recommendedcategorylist">Recommended Categories List</Link></h6>
            <h6 className="breadcumber-box"><Link>Edit Recommended Category</Link></h6>
          </Row>
        </Col>
      </Row>
      <Form className="form-screens" onSubmit={submitHandler}>
        <Col>
          <h2>Edit Recommended Category</h2>
        </Col>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
              <Fragment>
                <Col>
                  <Input
                    element="input"
                    type="text"
                    id="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    label="Name"
                  ></Input>
                </Col>
                <Col>
                  <Input
                    element="input"
                    type="text"
                    id="link"
                    placeholder="Enter link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    label="Link"
                  ></Input>
                </Col>
                <Col>
                  <Input
                    element="input"
                    type="text"
                    id="image"
                    placeholder="Enter image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    label="Image"
                  ></Input>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.File
                      type="file"
                      id="imageFile"
                      label="Image file"
                      onChange={uploadFileHandler} />
                  </Form.Group>
                </Col>
                <Col>
                  <CustomedButton
                    type="submit"
                    class="full-width margin-top btn-weight"
                    variant="dark"
                  >
                    Update
                </CustomedButton>
                </Col>
                <Col>
                  {loadingUpdate && <LoadingBox></LoadingBox>}
                  {errorUpdate && (
                    <MessageBox variant="danger">{errorUpdate}</MessageBox>
                  )}
                  {successUpdate && (
                    <MessageBox variant="success margin-top">
                      Updated
                    </MessageBox>
                  )}
                </Col>
              </Fragment>
            )}
      </Form>
    </Container>
  )
}

export default RecommendedCategoryEditScreen;