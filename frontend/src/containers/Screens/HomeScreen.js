import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listCovers } from '../../actions/coverActions';
import { listAdvertisingBoxes } from '../../actions/advertisingBoxActions';
import { listRecommendedCategories } from '../../actions/recommendedCategoryActions';
import { listBanners } from '../../actions/bannerActions';

import CoverCarousel from '../../components/CoverCarousel';
import CategoryBox from '../../components/CategoryBox';
import AdvertisingBox from '../../components/AdvertisingBox';
import ProductCarousel from '../../components/ProductCarousel';
import Newsletter from '../../components/Newsletter';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import Banner from '../../components/Banner';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const HomeScreen = () => {

    const dispatch = useDispatch();

    const coverList = useSelector(state => state.coverList);
    const { loading: loadingCover, error: errorCover, covers } = coverList;

    const advertisingBoxList = useSelector(state => state.advertisingBoxList);
    const { loading: loadingBox, error: errorBox, advertisingBoxes } = advertisingBoxList;

    const recommendedCategoryList = useSelector(state => state.recommendedCategoryList);
    const { loading: loadingCategory, error: errorCategory, recommendedCategories } = recommendedCategoryList;

    const bannerList = useSelector(state => state.bannerList);
    const { loading: loadingBanner, error: errorBanner, banners } = bannerList;

    useEffect(() => {
        dispatch(listCovers());
    }, [dispatch]);

    useEffect(() => {
        dispatch(listAdvertisingBoxes());
    }, [dispatch]);

    useEffect(() => {
        dispatch(listRecommendedCategories());
    }, [dispatch]);

    useEffect(() => {
        dispatch(listBanners());
    }, [dispatch]);

    return (
        <Fragment>
        {loadingCover? (
                <LoadingBox></LoadingBox>
            ) : errorCover? (
                <MessageBox variant="danger">{errorCover}</MessageBox>
            ) : (
            <CoverCarousel covers={covers}/>
        )}
        <Container className="container-mobile">
        {loadingCategory? (
                <LoadingBox></LoadingBox>
            ) : errorCategory? (
                <MessageBox variant="danger">{errorCategory}</MessageBox>
            ) : (
        <Row className="row-mobile">
            <CategoryBox categories={recommendedCategories} />
        </Row>
            )}
            <Row className="row-mobile">
                <ProductCarousel 
                    element="CarouselByTag"
                    tag="New"
                    productTag="new"
                />
            </Row>
            {loadingBox? (
                <LoadingBox></LoadingBox>
            ) : errorBox? (
                <MessageBox variant="danger">{errorBox}</MessageBox>
            ) : (
            <Row className="row-mobile">
                <AdvertisingBox advertisingBox={advertisingBoxes} />
            </Row>
            )}
            {loadingBanner? (
                <LoadingBox></LoadingBox>
            ) : errorBanner? (
                <MessageBox variant="danger">{errorBanner}</MessageBox>
            ) : (
            <Row className="row-mobile">
            {banners.map(banner => {
                if (banner.category === 'home') 
                return (
                <Banner key={banner._id} banner={banner} />
                )
            })}
            </Row>
            )}
            <Row className="row-mobile">
            <Col className="col-mobile">
                <Newsletter 
                    className="newsletter-mobile"
                />
            </Col>
            </Row>
        </Container>
        </Fragment>

    )
}

export default HomeScreen;