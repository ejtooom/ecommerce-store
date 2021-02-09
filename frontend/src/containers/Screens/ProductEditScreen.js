import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import Input from '../../components/UI/Input';
import FileUpload from '../../components/UI/FileUpload';
import CustomedButton from '../../components/UI/CustomedButton';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { detailsProduct, updateProduct } from '../../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants';

import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

const ProductEditScreen = (props) => {

  const productId = props.match.params.id;
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [image5, setImage5] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [tag, setTag] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      props.history.push('/productlist');
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setImage2(product.image2);
      setImage3(product.image3);
      setImage4(product.image4);
      setImage5(product.image5);
      setCategory(product.category);
      setSubcategory(product.subcategory);
      setTag(product.tag);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setDescription(product.description);
      setDeliveryTime(product.deliveryTime);
    }
  }, [product, dispatch, productId, props.history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        image2,
        image3,
        image4,
        image5,
        category,
        subcategory,
        tag,
        brand,
        countInStock,
        description,
        deliveryTime,
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

  const uploadFileTwoHandler = async (e) => {
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
      setImage2(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  const uploadFileThreeHandler = async (e) => {
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
      setImage3(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  const uploadFileFourHandler = async (e) => {
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
      setImage4(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  const uploadFileFiveHandler = async (e) => {
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
      setImage5(data);
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
              <h6 className="breadcumber-box"><Link to="/productlist">Product List</Link></h6>
              <h6 className="breadcumber-box"><Link>Product Edit</Link></h6>
          </Row>
        </Col>
      </Row>
      <Form className="form-screens" onSubmit={submitHandler}>
        <Col>
          <h2>Edit Product</h2>
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
                    id="price"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    label="Price"
                  ></Input>
                </Col>
                <Col>
                  <Input
                    element="input"
                    type="text"
                    id="category"
                    placeholder="Enter category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    label="Category"
                  ></Input>
                </Col>
                <Col>
                  <Input
                    element="input"
                    type="text"
                    id="subcategory"
                    placeholder="Enter subcategory"
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    label="Subcategory"
                  ></Input>
                </Col>
                <Col>
                  <Input
                    element="input"
                    type="text"
                    id="tag"
                    placeholder="Enter tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    label="Tag"
                  ></Input>
                </Col>
                <Col>
                  <Input
                    element="input"
                    type="text"
                    id="brand"
                    placeholder="Enter brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    label="Brand"
                  ></Input>
                </Col>
                <Col>
                  <Input
                    element="input"
                    type="text"
                    id="countInStock"
                    placeholder="Enter count in stock"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                    label="Count in stock"
                  ></Input>
                </Col>
                <Col>
                  <Input
                    element="input"
                    type="text"
                    id="deliveryTime"
                    placeholder="Enter delivery time"
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    label="Delivery Time"
                  ></Input>
                </Col>
                <Col>
                  <Input
                    element="textarea"
                    as="textarea"
                    rows="3"
                    type="text"
                    id="description"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    label="Description"
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
                    label="First image"
                  ></Input>
                  <FileUpload
                    type="file"
                    id="ImageFileOne"
                    onChange={uploadFileHandler} />
                  {loadingUpload && <LoadingBox></LoadingBox>}
                  {errorUpload && (
                    <MessageBox variant="danger">{errorUpload}</MessageBox>)}
                </Col>
                <Col>
                  <Input
                    element="input"
                    type="text"
                    id="imageTwo"
                    placeholder="Enter image"
                    value={image2}
                    onChange={(e) => setImage2(e.target.value)}
                    label="Second image"
                  ></Input>
                  <FileUpload
                    type="file"
                    id="imageFileTwo"
                    onChange={uploadFileTwoHandler} />
                  {loadingUpload && <LoadingBox></LoadingBox>}
                  {errorUpload && (
                    <MessageBox variant="danger">{errorUpload}</MessageBox>)}
                </Col>
                <Col>
                  <Input
                    element="input"
                    type="text"
                    id="imageThree"
                    placeholder="Enter image"
                    value={image3}
                    onChange={(e) => setImage3(e.target.value)}
                    label="Third image"
                  ></Input>
                  <FileUpload
                    type="file"
                    id="imageFileThree"
                    onChange={uploadFileThreeHandler} />
                  {loadingUpload && <LoadingBox></LoadingBox>}
                  {errorUpload && (
                    <MessageBox variant="danger">{errorUpload}</MessageBox>)}
                </Col>
                <Col>
                  <Input
                    element="input"
                    type="text"
                    id="imageFour"
                    placeholder="Enter image"
                    value={image4}
                    onChange={(e) => setImage4(e.target.value)}
                    label="Fourth mage"
                  ></Input>
                  <FileUpload
                    type="file"
                    id="imageFileFour"
                    onChange={uploadFileFourHandler} />
                  {loadingUpload && <LoadingBox></LoadingBox>}
                  {errorUpload && (
                    <MessageBox variant="danger">{errorUpload}</MessageBox>)}
                </Col>
                <Col>
                  <Input
                    element="input"
                    type="text"
                    id="imageFive"
                    placeholder="Enter image"
                    value={image5}
                    onChange={(e) => setImage5(e.target.value)}
                    label="Fifth image"
                  ></Input>
                  <FileUpload
                    type="file"
                    id="imageFileFive"
                    onChange={uploadFileFiveHandler} />
                  {loadingUpload && <LoadingBox></LoadingBox>}
                  {errorUpload && (
                    <MessageBox variant="danger">{errorUpload}</MessageBox>)}
                </Col>
                <Col>
                  <CustomedButton
                    type="submit"
                    class="full-width btn-weight margin-bottom"
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

export default ProductEditScreen;