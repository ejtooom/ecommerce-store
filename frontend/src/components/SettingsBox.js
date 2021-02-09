import React from 'react';
import { Link } from 'react-router-dom';

import ListGroup from 'react-bootstrap/ListGroup';

import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';


const SettingsBox = () => {
    return (
            <Row>
                <Col lg={12}>
                    <ListGroup as="ul">
                        <ListGroup.Item as="li">
                            <Link as={Link} to="/settings/coverlist">
                                Add Cover
                        </Link>
                        </ListGroup.Item>
                        <ListGroup.Item as="li">
                            <Link as={Link} to="/settings/infoboxlist">
                                Add Info Box
                        </Link>
                        </ListGroup.Item>
                        <ListGroup.Item as="li">
                            <Link as={Link} to="/settings/bannerlist">
                                Banner
                        </Link>
                        </ListGroup.Item>
                        <ListGroup.Item as="li">
                            <Link as={Link} to="/settings/advertisingboxlist">
                                Add Advertising Box
                        </Link>
                        </ListGroup.Item>
                        <ListGroup.Item as="li">
                            <Link as={Link} to="/settings/recommendedcategorylist">
                                Add Recommended Category
                        </Link>
                        </ListGroup.Item>
                        <ListGroup.Item as="li">
                            <Link as={Link} to="/settings/newsletterlist">
                                Newsletter List
                        </Link>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
    )
}

export default SettingsBox;