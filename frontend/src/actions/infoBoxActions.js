import Axios from 'axios';
import {   INFOBOX_CREATE_FAIL,
    INFOBOX_CREATE_REQUEST,
    INFOBOX_CREATE_SUCCESS,
    INFOBOX_DETAILS_FAIL,
    INFOBOX_DETAILS_REQUEST,
    INFOBOX_DETAILS_SUCCESS,
    INFOBOX_LIST_FAIL,
    INFOBOX_LIST_REQUEST,
    INFOBOX_LIST_SUCCESS,
    INFOBOX_UPDATE_REQUEST,
    INFOBOX_UPDATE_SUCCESS,
    INFOBOX_UPDATE_FAIL,
    INFOBOX_DELETE_REQUEST,
    INFOBOX_DELETE_FAIL,
    INFOBOX_DELETE_SUCCESS, } from '../constants/infoBoxConstants';

export const listInfoBoxes = () => async (dispatch) => {
    dispatch({ type: INFOBOX_LIST_REQUEST });
    try {
        const { data } = await Axios.get("/api/infoboxes");
        dispatch({ type: INFOBOX_LIST_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({ type: INFOBOX_LIST_FAIL, payload: error.message })
    }
}

export const detailsInfoBox = (infoBoxId) => async (dispatch) => {
    dispatch({ type: INFOBOX_DETAILS_REQUEST, payload: infoBoxId });
    try {
      const { data } = await Axios.get(`/api/infoboxes/${infoBoxId}`);
      dispatch({ type: INFOBOX_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: INFOBOX_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const createInfoBox = () => async (dispatch, getState) => {
    dispatch({ type: INFOBOX_CREATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        '/api/infoboxes',
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: INFOBOX_CREATE_SUCCESS,
        payload: data.infoBox,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: INFOBOX_CREATE_FAIL, payload: message });
    }
  };

  export const updateInfoBox = (infoBox) => async (dispatch, getState) => {
    dispatch({ type: INFOBOX_UPDATE_REQUEST, payload: infoBox });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.put(`/api/infoboxes/${infoBox._id}`, infoBox, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: INFOBOX_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: INFOBOX_UPDATE_FAIL, error: message });
    }
  };

  export const deleteInfoBox = (infoBoxId) => async (dispatch, getState) => {
    dispatch({ type: INFOBOX_DELETE_REQUEST, payload: infoBoxId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = Axios.delete(`/api/infoboxes/${infoBoxId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: INFOBOX_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: INFOBOX_DELETE_FAIL, payload: message });
    }
  };