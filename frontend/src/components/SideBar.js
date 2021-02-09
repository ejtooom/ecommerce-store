import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { listProductCategories } from '../actions/productActions';

import ListGroup from 'react-bootstrap/ListGroup';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';


const SideBar = (props) => {

    const dispatch = useDispatch();

    const productCategoryList = useSelector((state) => state.productCategoryList);
    const {
      loading: loadingCategories,
      error: errorCategories,
      categories,
    } = productCategoryList;

    useEffect(() => {
      dispatch(listProductCategories());
    }, [dispatch]);

    return (
        <aside className={props.sidebarIsOpen ? 'open' : ''}>
          <ListGroup as="ul" className="categories">
            <ListGroup.Item as="li">
              <strong>Categories</strong>
              <button
                onClick={props.onClick}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </ListGroup.Item>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <ListGroup.Item as="li" key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={props.onClick}
                  >
                    {c}
                  </Link>
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
        </aside>
    )
}

export default SideBar;