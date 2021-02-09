import Axios from 'axios';
import { CART_ADD_ITEM, CART_ADD_ITEM_FAIL, CART_REMOVE_ITEM, CART_SAVE_INVOICE_ADDRESS, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_SHIPPING_METHOD } from '../constants/cartConstants';

export const addToCart = (productId, qty) => async (dispatch, getState) => {
    const { data } = await Axios.get(`/api/products/${productId}`);
      dispatch({
        type: CART_ADD_ITEM,
        payload: {
          name: data.name,
          image: data.image,
          price: data.price,
          countInStock: data.countInStock,
          deliveryTime: data.deliveryTime,
          product: data._id,
          // seller: data.seller,
          qty,
        },
      });
      localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  };

export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const saveShippingMethod = (data) => (dispatch) => {
  dispatch ({ type: CART_SAVE_SHIPPING_METHOD, payload: data});
};

export const saveInvoiceAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_INVOICE_ADDRESS, payload: data });
  localStorage.setItem('invoiceAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch ({ type: CART_SAVE_PAYMENT_METHOD, payload: data});
};
