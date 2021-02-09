import React from 'react';
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';


const ProductCardCarousel = (props) => {
    const { product } = props;
    return (
        <Col lg={4} md={6} sm={6} xs={12}>
            <Card style={{ width: '12rem' }}>
                <Link to={`/product/${product._id}`}>
                    <Card.Img variant="top" src={product.image} alt={product.name}/>
                </Link>
                <Card.Body>
                    <Link to={`/product/${product._id}`}>
                        <Card.Text>
                            {product.name}
                        </Card.Text>
                    </Link>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ProductCardCarousel;