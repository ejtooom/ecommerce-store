import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { createProduct, deleteProduct, listProducts } from '../../actions/productActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import CustomedButton from '../../components/UI/CustomedButton';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../../constants/productConstants';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';


const ProductListScreen = (props) => {

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listProducts({}));
  }, [dispatch, successCreate, props.history, createdProduct, successDelete]);

  const deleteHandler = (product) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteProduct(product._id));
    }
  };

  const createHandler = () => {
    dispatch(createProduct());
  };

  return (
    <Container>
      <Row>
        <Col lg={12} md={12} sm={12} xs={12}>
          <Row className="breadcumber">
              <h6 className="breadcumber-box"><Link to="/">Home</Link></h6>
              <h6 className="breadcumber-box"><Link to="/productlist">Product List</Link></h6>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="title-margin-bottom">Products</h2>
        </Col>
        <Col className="to-the-right">
          <CustomedButton
            type="button"
            className="full-width"
            variant="outline-dark"
            onClick={createHandler}
          >
            Create Product
                </CustomedButton>
        </Col>
      </Row>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
            <Table responsive="sm" striped bordered hover className="table">
              <thead>
                <tr>
                  <th>IMAGE</th>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>SUBCATEGORY</th>
                  <th>TAG</th>
                  <th>BRAND</th>
                  <th colspan="2">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <Card style={{ width: '3rem' }}>
                        <Link to={`/product/${product._id}`}><Card.Img variant="top" src={product.image} /></Link>
                      </Card>
                    </td>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.subcategory}</td>
                    <td>{product.tag}</td>
                    <td>{product.brand}</td>
                    <td>
                      <CustomedButton
                        type="button"
                        className="full-width"
                        variant="outline-dark"
                        onClick={() =>
                          props.history.push(`/product/${product._id}/edit`)
                        }
                      >
                        Edit
                    </CustomedButton>
                    </td>
                    <td>
                      <CustomedButton
                        type="button"
                        className="full-width"
                        variant="dark"
                        onClick={() => deleteHandler(product)}
                      >
                        Delete
                    </CustomedButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
    </Container>
  )
}

export default ProductListScreen;