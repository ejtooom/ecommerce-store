import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ProductDeliveryDetails from '../../components/ProductDeliveryDetails';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { detailsProduct } from '../../actions/productActions';
import ProductCarousel from '../../components/ProductCarousel';
import ProductDescription from '../../components/ProductDescription';
import ProductImagesCard from '../../components/ProductImagesCard';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const ProductScreen = (props) => {

    const dispatch = useDispatch();

    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);


    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`)
    };

    return (
        <Container className="product-screen">
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                        <Fragment>
                            <Row>
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <Row className="breadcumber">
                                        <h6 className="breadcumber-box"><Link to="/">Home</Link></h6>
                                        <h6 className="breadcumber-box"><Link to={`/products/${product.category}`}>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</Link></h6>
                                        <h6 className="breadcumber-box"><Link to={`/products/sub/${product.subcategory}`}>{product.subcategory.charAt(0).toUpperCase() + product.subcategory.slice(1)}</Link></h6>
                                        <h6 className="breadcumber-box"><Link to={`/product/${productId}`}>{product.name.charAt(0).toUpperCase() + product.name.slice(1)}</Link></h6>
                                    </Row>
                                </Col>
                            </Row>
                            <h2>{product.name}</h2>
                            <Row>
                                <ProductImagesCard
                                    src={product.image}
                                    srcOne={product.image}
                                    srcTwo={product.image2}
                                    srcThree={product.image3}
                                    srcFour={product.image4}
                                    srcFive={product.image5}
                                />
                                <ProductDeliveryDetails
                                    deliveryTime={product.deliveryTime}
                                    price={product.price}
                                    brand={product.brand}
                                    productId={product._id}
                                    status={product.countInStock > 0 ? "In Stock" : "Unavailable"}
                                    statusClass={product.countInStock > 0 ? "success" : "danger"}
                                    countInStock={product.countInStock}
                                    qty={qty}
                                    setQty={setQty}
                                    addToCartHandler={addToCartHandler}
                                    rating={product.rating}
                                    numReviews={product.numReviews}
                                />
                            </Row>
                            <Row>
                                <ProductDescription
                                    description={product.description}
                                />
                            </Row>
                            <Row>
                                <ProductCarousel
                                    productCategory={product.category}
                                    productId={productId}
                                />
                            </Row>
                        </Fragment>
                    )}
        </Container>
    )
}

export default ProductScreen;