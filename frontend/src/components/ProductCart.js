import React from 'react';
import { Link } from 'react-router-dom';

import CustomedButton from './UI/CustomedButton';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';


const ProductCard= (props) => {
    const { product } = props;
    return (
        <Col className="product-card" xl={4} lg={6} md={6} sm={12} xs={12}>
            <Card style={{ width: '16rem' }}>
                <Link to={`/product/${product._id}`}>
                    <Card.Img variant="top" src={product.image} alt={product.name}/>
                </Link>
                <Card.Body>
                        <Card.Text className="product-card-text">
                            {product.name}
                        </Card.Text>
                    <Card.Title>{product.price} USD</Card.Title>
                    <CustomedButton variant='dark' to={`/product/${product._id}`} size="lg" class="half-width btn-weight">BUY</CustomedButton>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ProductCard;