import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';


const ProductImagesCard = (props) => {

    const [active, setActive] = useState(props.src)

    return (
        <Col lg={6} md={6} sm={12} xs={12}>
            <Card >
                <Card.Img variant="top" src={active} alt={props.alt} />
                <Card.Body className="card-body-border">
                    <Row className="product-images-small-cards">
                    <Card style={{ width: '6rem' }}>
                        <Link onClick={() => setActive(props.srcOne)}><Card.Img className="zoom" variant="top" src={props.srcOne} /></Link>
                    </Card>
                    <Card style={{ width: '6rem' }}>
                        <Link onClick={() => setActive(props.srcTwo)}><Card.Img className="zoom" variant="top" src={props.srcTwo} /></Link>
                    </Card>
                    <Card style={{ width: '6rem' }}>
                        <Link onClick={() => setActive(props.srcThree)}><Card.Img className="zoom" variant="top" src={props.srcThree} /></Link>
                    </Card>
                    <Card style={{ width: '6rem' }}>
                        <Link onClick={() => setActive(props.srcFour)}><Card.Img className="zoom" variant="top" src={props.srcFour} /></Link>
                    </Card>
                    <Card style={{ width: '6rem' }}>
                        <Link onClick={() => setActive(props.srcFive)}><Card.Img className="zoom" variant="top" src={props.srcFive} /></Link>
                    </Card> 
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ProductImagesCard;