import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Input from '../../components/UI/Input';
import CustomedButton from '../../components/UI/CustomedButton';
import MessageBox from '../../components/MessageBox';
import { saveInvoiceAddress } from '../../actions/cartActions';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import AccountDetailsBox from '../../components/AccountDetailsBox';


const UserInvoiceAddressScreen = (props) => {

    const userSignin = useSelector((state) => state.userSignin);

    const { userInfo } = userSignin;
    const cart = useSelector((state) => state.cart);
    const { invoiceAddress, shippingAddress } = cart;

    if (!userInfo) {
        props.history.push('/signin');
    }

    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
    const [number, setNumber] = useState(shippingAddress.number);
    const [companyName, setCompanyName] = useState(invoiceAddress.companyName);
    const [companyNumber, setCompanyNumber] = useState(invoiceAddress.companyNumber);
    const [successUpdated, setSuccessUpdated] = useState(false)

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            saveInvoiceAddress({
                fullName,
                address,
                city,
                postalCode,
                country,
                number,
                companyName,
                companyNumber,
            })
        );
        setSuccessUpdated(true);
    };

    return (
        <Container>
            <Row>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <Row className="breadcumber">
                        <h6 className="breadcumber-box"><Link to="/">Home</Link></h6>
                        <h6 className="breadcumber-box"><Link to="/accountdetails">Account details</Link></h6>
                        <h6 className="breadcumber-box"><Link to="/accountdetails/invoiceaddress">Invoice address</Link></h6>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col lg={3}>
                    <AccountDetailsBox />
                </Col>
                <Col lg={9}>
                    <Form className="form-screens" onSubmit={submitHandler}>
                        <Col>
                            <h2>Invoice Address</h2>
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
                                id="companyName"
                                placeholder="Enter company name"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                required
                                label="Company Name"
                            ></Input>
                        </Col>
                        <Col>
                            <Input
                                element="input"
                                type="text"
                                id="companyNumber"
                                placeholder="Enter company number"
                                value={companyNumber}
                                onChange={(e) => setCompanyNumber(e.target.value)}
                                required
                                label="Company Number"
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
                            <CustomedButton variant="dark" class="full-width margin-top margin-bottom btn-weight" type="submit">
                                Update
                    </CustomedButton>
                        </Col>
                        <Col>
                            {successUpdated ? (
                                <MessageBox variant="success margin-top">
                                    Updated
                                </MessageBox>
                            ) : ('')}
                        </Col>
                    </Form>
                    {/* </Row> */}
                </Col>


            </Row>
        </Container>
    )
}

export default UserInvoiceAddressScreen;