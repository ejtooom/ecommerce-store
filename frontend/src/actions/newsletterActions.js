import Axios from 'axios';
import {   NEWSLETTER_CREATE_FAIL,
    NEWSLETTER_CREATE_REQUEST,
    NEWSLETTER_CREATE_SUCCESS,
    NEWSLETTER_DETAILS_FAIL,
    NEWSLETTER_DETAILS_REQUEST,
    NEWSLETTER_DETAILS_SUCCESS,
    NEWSLETTER_LIST_FAIL,
    NEWSLETTER_LIST_REQUEST,
    NEWSLETTER_LIST_SUCCESS,
    NEWSLETTER_DELETE_REQUEST,
    NEWSLETTER_DELETE_FAIL,
    NEWSLETTER_DELETE_SUCCESS, } from '../constants/newsletterConstants';

export const listNewsletters = () => async (dispatch, getState) => {
    dispatch({ type: NEWSLETTER_LIST_REQUEST });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
        const { data } = await Axios.get("/api/newsletters", {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        dispatch({ type: NEWSLETTER_LIST_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({ type: NEWSLETTER_LIST_FAIL, payload: error.message })
    }
}

export const detailsNewsletter = (newsletterId) => async (dispatch, getState) => {
    dispatch({ type: NEWSLETTER_DETAILS_REQUEST, payload: newsletterId });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.get(`/api/newsletters/${newsletterId}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: NEWSLETTER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: NEWSLETTER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const createNewsletter = (email) => async (dispatch, getState) => {
    dispatch({ type: NEWSLETTER_CREATE_REQUEST, payload: { email } });
    try {
      const { data } = await Axios.post(
        '/api/newsletters',
        { email }
      );
      dispatch({
        type: NEWSLETTER_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: NEWSLETTER_CREATE_FAIL, payload: message });
    }
  };

  export const deleteNewsletter = (newsletterId) => async (dispatch, getState) => {
    dispatch({ type: NEWSLETTER_DELETE_REQUEST, payload: newsletterId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = Axios.delete(`/api/newsletters/${newsletterId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: NEWSLETTER_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: NEWSLETTER_DELETE_FAIL, payload: message });
    }
  };