import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import Input from '../../components/UI/Input';
import CustomedButton from '../../components/UI/CustomedButton';
import { BANNER_UPDATE_RESET } from '../../constants/bannerConstants';
import { detailsBanner, updateBanner } from '../../actions/bannerActions';

import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';


const BannerEditScreen = (props) => {

    const bannerId = props.match.params.id;
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [link, setLink] = useState('');
    const [image, setImage] = useState('');

    const bannerDetails = useSelector((state) => state.bannerDetails);
    const { loading, error, banner } = bannerDetails;

    const bannerUpdate = useSelector((state) => state.bannerUpdate);
    const {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
    } = bannerUpdate;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successUpdate) {
          props.history.push('/settings/bannerlist');
        }
        if (!banner || banner._id !== bannerId || successUpdate) {
          dispatch({ type: BANNER_UPDATE_RESET });
          dispatch(detailsBanner(bannerId));
        } else {
          setName(banner.name);
          setCategory(banner.category);
          setSubcategory(banner.subcategory);
          setLink(banner.link);
          setImage(banner.image);
        }
      }, [banner, dispatch, bannerId, props.history, successUpdate]);

      const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
          updateBanner({
            _id: bannerId,
            name,
            category,
            subcategory,
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
            <h6 className="breadcumber-box"><Link to="/settings/bannerlist">Banner List</Link></h6>
            <h6 className="breadcumber-box"><Link>Edit Banner</Link></h6>
          </Row>
        </Col>
      </Row>
        <Form className="form-screens" onSubmit={submitHandler}>
            <Col>
                <h2>Edit Banner</h2>
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

export default BannerEditScreen;