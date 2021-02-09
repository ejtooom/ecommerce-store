import React from 'react';
import { Link } from "react-router-dom";

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';


const InfoBox = (props) => {
    const { infoBox } = props;
    return (
            <Col className="hide-small" lg={12} md={4}>
                <Link to={infoBox.link}>
                    <Card className=" " style={{ width: '12rem' }}>
                        <Card.Img className="image-center" src={infoBox.image} alt={infoBox.name} style={{ width: '4rem' }}/>
                        <Card.Body>
                            <Card.Title>{infoBox.title}</Card.Title>
                            <Card.Text>{infoBox.text}</Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
            </Col>
    )
}

export default InfoBox;