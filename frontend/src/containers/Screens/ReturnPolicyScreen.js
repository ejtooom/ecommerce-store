import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Newsletter from '../../components/Newsletter';
import InfoBox from '../../components/InfoBox';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { listInfoBoxes } from '../../actions/infoBoxActions';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const ReturnPolicy = () => {

    const infoBoxList = useSelector(state => state.infoBoxList);
    const { loading: loadingInfoBox, error: errorInfoBox, infoBoxes } = infoBoxList;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listInfoBoxes());
    }, [dispatch]);

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
                        <h6 className="breadcumber-box"><Link to="/return-policy">Return policy</Link></h6>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col lg={3} md={12} className="infobox-hide">
                    {loadingInfoBox ? (
                        <LoadingBox></LoadingBox>
                    ) : errorInfoBox ? (
                        <MessageBox variant="danger">{errorInfoBox}</MessageBox>
                    ) : (
                                <Row>
                                    {infoBoxes.map(infoBox => {
                                        return (
                                            <InfoBox key={infoBox._id} infoBox={infoBox} />
                                        )
                                    })}
                                </Row>
                            )}
                </Col>
                <Col lg={9} className="top-margin">
                    <h3>Return Policy</h3>
                    <br />
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                    in culpa qui officia deserunt mollit anim id est laborum."</p>
                    <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                    totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                    sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                    consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
                    dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora
                    incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
                    exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
                    vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui
                    dolorem eum fugiat quo voluptas nulla pariatur?"</p>
                </Col>
            </Row>
            <Row>
                <Newsletter />
            </Row>
        </Container>

    )
}

export default ReturnPolicy;