import React, { Fragment } from 'react';
import { Link } from "react-router-dom";

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';


const Banner = (props) => {
    const { banner } = props;
    return (
        <Fragment>
            <Col md={12} className="col-mobile">
                <Link to={banner.link}>
                    <Card className={props.className}>
                        <Card.Img src={banner.image} alt={banner.name} />
                    </Card>
                </Link>
            </Col>
    </Fragment>
    )
}

export default Banner;