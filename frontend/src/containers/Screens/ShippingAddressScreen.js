import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

import CheckoutSteps from '../../components/CheckoutSteps';
import CustomedButton from '../../components/UI/CustomedButton';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../actions/cartActions';

import Col from 'react-bootstrap/Col';
import Input from '../../components/UI/Input';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';

const ShippingAddressScreen = (props) => {

  const userSignin = useSelector((state) => state.userSignin);

  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [lat, setLat] = useState(shippingAddress.lat);
  const [lng, setLng] = useState(shippingAddress.lng);
  const userAddressMap = useSelector((state) => state.userAddressMap);
  const { address: addressMap } = userAddressMap;

  if (!userInfo) {
    props.history.push('/signin');
  }

  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [number, setNumber] = useState(shippingAddress.number);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const newLat = addressMap ? addressMap.lat : lat;
    const newLng = addressMap ? addressMap.lng : lng;
    if (addressMap) {
      setLat(addressMap.lat);
      setLng(addressMap.lng);
    }
    let moveOn = true;
    if (!newLat || !newLng) {
      moveOn = window.confirm(
        'You did not set your location on map. Continue?'
      );
    }
    if (moveOn) {
      dispatch(
        saveShippingAddress({
          fullName,
          address,
          city,
          postalCode,
          country,
          number,
          lat: newLat,
          lng: newLng,
        })
      );
      props.history.push('/shippingmethod');
    }
  };

  const chooseOnMap = () => {
    dispatch(
      saveShippingAddress({
        fullName,
        address,
        city,
        postalCode,
        country,
        number,
        lat,
        lng,
      })
    );
    props.history.push('/map');
  };

    return (
        <Fragment>
        <CheckoutSteps step1 step2></CheckoutSteps>
        <Container>
            <Form className="form-screens" onSubmit={submitHandler}>
                <Col className="title-screens">
                    <h1>Shipping Address</h1>
                </Col>
                <Col>
                    <Input
                        element="input"
                        type="text"
                        id="fullName"
                        placeholder="Enter full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        label="Full Name"
                    ></Input>
                </Col>
                <Col>
                    <Input
                        element="input"
                        type="text"
                        id="number"
                        placeholder="Enter phone number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        required
                        label="Phone Number"
                    ></Input>
                </Col>
                <Col>
                    <Input
                        element="input"
                        type="text"
                        id="address"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        label="Address"
                    ></Input>
                </Col>
                <Col>
                    <Input
                        element="input"
                        type="text"
                        id="city"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        label="City"
                    ></Input>
                </Col>
                <Col>
                    <Input
                        element="input"
                        type="text"
                        id="postalCode"
                        placeholder="Enter postal code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                        label="Postal Code"
                    ></Input>
                </Col>
                <Col>
                    <Input
                        element="input"
                        type="text"
                        id="country"
                        placeholder="Enter country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        label="Country"
                    ></Input>
                </Col>
                <Col>
                  Different invoice address or wanna fill up company data? <Link to="/accountdetails/invoiceaddress"><strong>(change)</strong></Link>
                </Col>
                <Col>
                    <CustomedButton variant="outline-dark" class="full-width margin-top btn-weight" type="button" onClick={chooseOnMap}>
                        Choose On Map
                    </CustomedButton>
                </Col>
                <Col>
                    <CustomedButton variant="dark" class="full-width margin-top btn-weight" type="submit">
                        Continue
                    </CustomedButton>
                </Col>
            </Form>
        </Container>
        </Fragment>
    )
}

export default ShippingAddressScreen;