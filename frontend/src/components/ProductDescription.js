import React from 'react';

import Col from 'react-bootstrap/Col';


const ProductDescription = (props) => {
    return (
        <Col lg={12} md={12} sm={12} xs={12} className="product-description">
            <h3><strong>Description</strong></h3>
            <p>{props.description}</p>

        </Col>
    )
}

export default ProductDescription;