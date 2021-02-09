import React, { Fragment } from 'react';
import { Link } from "react-router-dom";

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';


const AdvertisingBox = (props) => {
    return (
        <Fragment>
        {props.advertisingBox.map(item => (
            <Col key={item._id} md={6} className="col-mobile">
                <Link to={item.link}>
                    <Card className="card-mobile">
                        <Card.Img src={item.image} alt={item.name} />
                    </Card>
                </Link>
            </Col>
        ))}
    </Fragment>
    )
}

export default AdvertisingBox;