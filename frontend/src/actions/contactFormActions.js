import Axios from 'axios';
import {   CONTACTFORM_CREATE_FAIL,
    CONTACTFORM_CREATE_REQUEST,
    CONTACTFORM_CREATE_SUCCESS,
    CONTACTFORM_DETAILS_FAIL,
    CONTACTFORM_DETAILS_REQUEST,
    CONTACTFORM_DETAILS_SUCCESS,
    CONTACTFORM_LIST_FAIL,
    CONTACTFORM_LIST_REQUEST,
    CONTACTFORM_LIST_SUCCESS,
    CONTACTFORM_DELETE_REQUEST,
    CONTACTFORM_DELETE_FAIL,
    CONTACTFORM_DELETE_SUCCESS,
    CONTACTFORM_MINE_LIST_REQUEST,
    CONTACTFORM_MINE_LIST_SUCCESS,
    CONTACTFORM_MINE_LIST_FAIL, } from '../constants/contactFormConstants';

export const listContactForms = ({
  pageNumber = '',
}) => async (dispatch, getState) => {
    dispatch({ type: CONTACTFORM_LIST_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get(`/api/contactforms?pageNumber=${pageNumber}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: CONTACTFORM_LIST_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({ type: CONTACTFORM_LIST_FAIL, payload: error.message })
    }
}

export const listContactFormsMine = ({
  pageNumber = '',
}) => async (dispatch, getState) => {
    dispatch({ type: CONTACTFORM_MINE_LIST_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get(`/api/contactforms/mine?pageNumber=${pageNumber}`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        dispatch({ type: CONTACTFORM_MINE_LIST_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({ type: CONTACTFORM_MINE_LIST_FAIL, payload: error.message })
    }
}

export const detailsContactForm = (contactFormId) => async (dispatch, getState) => {
    dispatch({ type: CONTACTFORM_DETAILS_REQUEST, payload: contactFormId });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.get(`/api/contactforms/${contactFormId}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: CONTACTFORM_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CONTACTFORM_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const createContactForm = (name, email, title, text) => async (dispatch, getState) => {
    dispatch({ type: CONTACTFORM_CREATE_REQUEST, payload: { name, email, title, text } });
    try {
      const { data } = await Axios.post(
        '/api/contactforms',
        { name, email, title, text }
      );
      dispatch({
        type: CONTACTFORM_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: CONTACTFORM_CREATE_FAIL, payload: message });
    }
  };

  export const deleteContactForm = (contactFormId) => async (dispatch, getState) => {
    dispatch({ type: CONTACTFORM_DELETE_REQUEST, payload: contactFormId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = Axios.delete(`/api/contactforms/${contactFormId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: CONTACTFORM_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: CONTACTFORM_DELETE_FAIL, payload: message });
    }
  };