import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Carousel from 'react-bootstrap/Carousel';


const CoverCarousel = (props) => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            {props.covers.map(item => (
                <Carousel.Item key={item._id} className="cover-carousel">
                    <Link to={item.link}>
                    <img
                        className="d-block w-100 cover-carousel-image"
                        src={item.image}
                        alt={item.name}
                    />
                    </Link>
                </Carousel.Item>
            ))};
        </Carousel>
    );
}

export default CoverCarousel;