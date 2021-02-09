import React, { Fragment } from 'react';
import { Link } from "react-router-dom";

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';


const CategoryBox = (props) => {
    return (
    <Fragment>
        {props.categories.map(category => (
            <Col key={category._id} md={3} className="col-mobile">
                <Link to={category.link}>
                    <Card className="card-mobile">
                        <Card.Img src={category.image} alt={category.name} />
                    </Card>
                </Link>
            </Col>
        ))}
    </Fragment>
    )
}

export default CategoryBox;