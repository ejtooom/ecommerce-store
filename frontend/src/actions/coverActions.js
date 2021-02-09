import Axios from 'axios';
import {   COVER_CREATE_FAIL,
    COVER_CREATE_REQUEST,
    COVER_CREATE_SUCCESS,
    COVER_DETAILS_FAIL,
    COVER_DETAILS_REQUEST,
    COVER_DETAILS_SUCCESS,
    COVER_LIST_FAIL,
    COVER_LIST_REQUEST,
    COVER_LIST_SUCCESS,
    COVER_UPDATE_REQUEST,
    COVER_UPDATE_SUCCESS,
    COVER_UPDATE_FAIL,
    COVER_DELETE_REQUEST,
    COVER_DELETE_FAIL,
    COVER_DELETE_SUCCESS, } from '../constants/coverConstants';

export const listCovers = () => async (dispatch) => {
    dispatch({ type: COVER_LIST_REQUEST });
    try {
        const { data } = await Axios.get("/api/covers");
        dispatch({ type: COVER_LIST_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({ type: COVER_LIST_FAIL, payload: error.message })
    }
}

export const detailsCover = (coverId) => async (dispatch) => {
    dispatch({ type: COVER_DETAILS_REQUEST, payload: coverId });
    try {
      const { data } = await Axios.get(`/api/covers/${coverId}`);
      dispatch({ type: COVER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: COVER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const createCover = () => async (dispatch, getState) => {
    dispatch({ type: COVER_CREATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        '/api/covers',
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: COVER_CREATE_SUCCESS,
        payload: data.cover,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: COVER_CREATE_FAIL, payload: message });
    }
  };

  export const updateCover = (cover) => async (dispatch, getState) => {
    dispatch({ type: COVER_UPDATE_REQUEST, payload: cover });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.put(`/api/covers/${cover._id}`, cover, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: COVER_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: COVER_UPDATE_FAIL, error: message });
    }
  };

  export const deleteCover = (coverId) => async (dispatch, getState) => {
    dispatch({ type: COVER_DELETE_REQUEST, payload: coverId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = Axios.delete(`/api/covers/${coverId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: COVER_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: COVER_DELETE_FAIL, payload: message });
    }
  };