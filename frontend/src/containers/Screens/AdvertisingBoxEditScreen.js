import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import { COVER_UPDATE_RESET } from '../../constants/coverConstants';
import { detailsAdvertisingBox, updateAdvertisingBox } from '../../actions/advertisingBoxActions';
import CustomedButton from '../../components/UI/CustomedButton';
import Input from '../../components/UI/Input';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';

import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';


const AdvertisingBoxEditScreen = (props) => {

    const advertisingBoxId = props.match.params.id;
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [image, setImage] = useState('');

    const advertisingBoxDetails = useSelector((state) => state.advertisingBoxDetails);
    const { loading, error, advertisingBox } = advertisingBoxDetails;

    const advertisingBoxUpdate = useSelector((state) => state.advertisingBoxUpdate);
    const {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
    } = advertisingBoxUpdate;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successUpdate) {
          props.history.push('/settings/advertisingboxlist');
        }
        if (!advertisingBox || advertisingBox._id !== advertisingBoxId || successUpdate) {
          dispatch({ type: COVER_UPDATE_RESET });
          dispatch(detailsAdvertisingBox(advertisingBoxId));
        } else {
          setName(advertisingBox.name);
          setLink(advertisingBox.link);
          setImage(advertisingBox.image);
        }
      }, [successUpdate, advertisingBox, dispatch, advertisingBoxId, props.history]);

      const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
          updateAdvertisingBox({
            _id: advertisingBoxId,
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
            <h6 className="breadcumber-box"><Link to="/settings/advertisingboxlist">Advertising Box List</Link></h6>
            <h6 className="breadcumber-box"><Link>Edit Advertising Box</Link></h6>
          </Row>
        </Col>
      </Row>
        <Form className="form-screens" onSubmit={submitHandler}>
            <Col>
                <h2>Edit Advertising Box</h2>
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

export default AdvertisingBoxEditScreen;