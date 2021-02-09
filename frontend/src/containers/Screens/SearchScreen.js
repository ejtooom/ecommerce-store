import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { listProductBrands, listProductCategories, listProducts } from '../../actions/productActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import InfoBox from '../../components/InfoBox';
import Newsletter from '../../components/Newsletter';
import ProductCard from '../../components/ProductCart';
import { listBanners } from '../../actions/bannerActions';
import { listInfoBoxes } from '../../actions/infoBoxActions';
import Banner from '../../components/Banner';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'


const SearchScreen = (props) => {

    const { 
        name = 'all',
        category = 'all',
        brand = 'all',
        min = 0,
        max = 0,
        order = 'newest',
    } = useParams();

    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const infoBoxList = useSelector(state => state.infoBoxList);
    const { loading: loadingInfoBox, error: errorInfoBox, infoBoxes } = infoBoxList;

    const productCategoryList = useSelector((state) => state.productCategoryList);
    const {
        loading: loadingCategories,
        error: errorCategories,
        categories,
    } = productCategoryList;

    const productBrandList = useSelector((state) => state.productBrandList);
    const {
        loading: loadingBrands,
        error: errorBrands,
        brands,
    } = productBrandList;

    const bannerList = useSelector(state => state.bannerList);
    const { loading: loadingBanner, error: errorBanner, banners } = bannerList;

    useEffect(() => {
        dispatch(
            listProducts({
                name: name !== 'all' ? name : '',
                category: category !== 'all' ? category : '',
                brand: brand !== 'all' ? brand : '',
                min,
                max,
                order,
            })
        );
    }, [category, dispatch, max, min, name, order, brand]);

    useEffect(() => {
        dispatch(listInfoBoxes());
    }, [dispatch]);

    useEffect(() => {
        dispatch(listProductCategories());
    }, [dispatch]);

    useEffect(() => {
        dispatch(listProductBrands());
    }, [dispatch]);

    useEffect(() => {
        dispatch(listBanners());
    }, [dispatch]);

    const getFilterUrl = (filter) => {
        const filterCategory = filter.category || category;
        const filterBrand = filter.brand || brand;
        const filterName = filter.name || name;
        const sortOrder = filter.order || order;
        const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
        const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
        return `/search/category/${filterCategory}/brand/${filterBrand}/name/${filterName}/min/${filterMin}/max/${filterMax}/order/${sortOrder}`;
    };

    return (
        <Container>
            <Row>
                <Col lg={3}>
                    <Row>
                        <Col lg={12} md={12} sm={12} xs={12}>
                        </Col>
                    </Row>

                </Col>
                <Col lg={9} md={12} sm={12} xs={12}>
                    <Row className="breadcumber">
                        <h6 className="breadcumber-box"><Link to="/">Home</Link></h6>
                        <h6 className="breadcumber-box"><Link>Product Search</Link></h6>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col lg={3} md={12}>
                    {loadingInfoBox ? (
                        <LoadingBox></LoadingBox>
                    ) : errorInfoBox ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                                <Row>
                                    <Col lg={12} md={4} className="search-box">
                                        <Form.Control
                                            id={props.id}
                                            className="search-option"
                                            as="select"
                                            value={order}
                                            onChange={(e) => {
                                                props.history.push(getFilterUrl({ order: e.target.value }));
                                            }}
                                        >
                                            <option value="newest">Newest Arrivals</option>
                                            <option value="lowest">Price: Low to High</option>
                                            <option value="highest">Price: High to Low</option>
                                        </Form.Control>
                                        {loadingCategories ? (
                                            <LoadingBox></LoadingBox>
                                        ) : errorCategories ? (
                                            <MessageBox variant="danger">{errorCategories}</MessageBox>
                                        ) : (
                                                    <Form.Control
                                                        id={props.id}
                                                        className="search-option"
                                                        as="select"
                                                        value={category}
                                                        onChange={(e) => {
                                                            props.history.push(getFilterUrl({ category: e.target.value }));
                                                        }}
                                                    >
                                                        <option value="all">Category: All</option>
                                                        {categories.map((c) => (
                                                            <option value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                                                        ))}
                                                    </Form.Control>
                                                )}
                                        {loadingBrands ? (
                                            <LoadingBox></LoadingBox>
                                        ) : errorBrands ? (
                                            <MessageBox variant="danger">{errorBrands}</MessageBox>
                                        ) : (
                                                    <Form.Control
                                                        id={props.id}
                                                        className="search-option"
                                                        as="select"
                                                        value={brand}
                                                        onChange={(e) => {
                                                            props.history.push(getFilterUrl({ brand: e.target.value }));
                                                        }}
                                                    >
                                                        <option value="all">Brand: All</option>
                                                        {brands.map((b) => (
                                                            <option value={b}>{b.charAt(0).toUpperCase() + b.slice(1)}</option>
                                                        ))}
                                                    </Form.Control>
                                                )}
                                    </Col>
                                    {infoBoxes.map(infoBox => {
                                        return (
                                            <InfoBox key={infoBox._id} infoBox={infoBox} />
                                        )
                                    })}
                                </Row>
                            )}
                </Col>
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                            <Col lg={9}>
                                <Row>
                                    {loadingBanner ? (
                                        <LoadingBox></LoadingBox>
                                    ) : errorBanner ? (
                                        <MessageBox variant="danger">{error}</MessageBox>
                                    ) : (
                                                <Fragment>
                                                    {banners.map(banner => {
                                                        if (banner.category === 'home') {
                                                            return (
                                                                <Banner className="remove-margin-top" key={banner._id} banner={banner} />
                                                            )
                                                        }
                                                    })}
                                                </Fragment>
                                            )}
                                </Row>
                                <Row>
                                    {products.length === 0 && (
                                        <MessageBox>No Product Found</MessageBox>
                                    )}
                                    {products.map((product) => (
                                        <ProductCard key={product._id} product={product}></ProductCard>
                                    ))}
                                </Row>
                            </Col>
                        )}
            </Row>
            <Newsletter />
        </Container>
    )
}

export default SearchScreen;