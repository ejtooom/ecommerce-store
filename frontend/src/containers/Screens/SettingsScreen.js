import React from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import SettingsBox from '../../components/SettingsBox';


const SettingsScreen = () => {
    return (
        <Container>
            <Row>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <Row className="breadcumber">
                        <h6 className="breadcumber-box"><Link to="/">Home</Link></h6>
                        <h6 className="breadcumber-box"><Link to="/settings">Settings</Link></h6>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col lg={3}>
                    <SettingsBox />
                </Col>
            </Row>

        </Container>
    )
}

export default SettingsScreen;