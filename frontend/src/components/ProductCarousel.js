import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import ProductCardCarousel from './ProductCardCarousel';

import Carousel from "react-multi-carousel";
import Col from 'react-bootstrap/Col';
import "react-multi-carousel/lib/styles.css";



const ProductCarousel = (props) => {

    const dispatch = useDispatch();
    
    const productList = useSelector( state => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts({}));
    }, [dispatch]);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1200 },
            items: 5
        },
        largeDesktop: {
            breakpoint: { max: 1200, min: 992 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 992, min: 768 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 768, min: 576 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 576, min: 0 },
            items: 1
        }
    };

    return (
        <Col className="product-carousel">
        {props.element === "CarouselByTag" ? (
            <h3><strong>{props.tag}</strong></h3>
        ) : (
            <h3><strong>Other products in the same category</strong></h3>
        )}
        {loading? (
                <LoadingBox></LoadingBox>
            ) : error? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : props.element === "CarouselByTag"? (
            <Carousel responsive={responsive}>
            {products.map(product => {
                if(product.tag === props.productTag) 
                    return (
                        <ProductCardCarousel 
                        key={product._id} product={product}/>
                    )
                }
            )}
            </Carousel>
            ) : (
                <Carousel responsive={responsive}>
            {products.map(product => {
                if(product.category === props.productCategory) {
                    if(product._id !== props.productId)
                    return (
                        <ProductCardCarousel 
                        key={product._id} product={product}/>
                    )
                }
            })}
            </Carousel> 
            )}
        </Col>
    )
}

export default ProductCarousel;