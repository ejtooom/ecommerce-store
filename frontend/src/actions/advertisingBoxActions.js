import Axios from 'axios';
import {   ADVERTISING_BOX_CREATE_FAIL,
    ADVERTISING_BOX_CREATE_REQUEST,
    ADVERTISING_BOX_CREATE_SUCCESS,
    ADVERTISING_BOX_DETAILS_FAIL,
    ADVERTISING_BOX_DETAILS_REQUEST,
    ADVERTISING_BOX_DETAILS_SUCCESS,
    ADVERTISING_BOX_LIST_FAIL,
    ADVERTISING_BOX_LIST_REQUEST,
    ADVERTISING_BOX_LIST_SUCCESS,
    ADVERTISING_BOX_UPDATE_REQUEST,
    ADVERTISING_BOX_UPDATE_SUCCESS,
    ADVERTISING_BOX_UPDATE_FAIL,
    ADVERTISING_BOX_DELETE_REQUEST,
    ADVERTISING_BOX_DELETE_FAIL,
    ADVERTISING_BOX_DELETE_SUCCESS, } from '../constants/advertisingBoxConstants';


export const listAdvertisingBoxes = () => async (dispatch) => {
    dispatch({ type: ADVERTISING_BOX_LIST_REQUEST });
    try {
        const { data } = await Axios.get("/api/advertisingboxes");
        dispatch({ type: ADVERTISING_BOX_LIST_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({ type: ADVERTISING_BOX_LIST_FAIL, payload: error.message })
    }
}

export const detailsAdvertisingBox = (advertisingBoxId) => async (dispatch) => {
    dispatch({ type: ADVERTISING_BOX_DETAILS_REQUEST, payload: advertisingBoxId });
    try {
      const { data } = await Axios.get(`/api/advertisingboxes/${advertisingBoxId}`);
      dispatch({ type: ADVERTISING_BOX_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ADVERTISING_BOX_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const createAdvertisingBox = () => async (dispatch, getState) => {
    dispatch({ type: ADVERTISING_BOX_CREATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        '/api/advertisingboxes',
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: ADVERTISING_BOX_CREATE_SUCCESS,
        payload: data.advertisingBox,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ADVERTISING_BOX_CREATE_FAIL, payload: message });
    }
  };

  export const updateAdvertisingBox = (advertisingBox) => async (dispatch, getState) => {
    dispatch({ type: ADVERTISING_BOX_UPDATE_REQUEST, payload: advertisingBox });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.put(`/api/advertisingboxes/${advertisingBox._id}`, advertisingBox, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: ADVERTISING_BOX_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ADVERTISING_BOX_UPDATE_FAIL, error: message });
    }
  };

  export const deleteAdvertisingBox = (advertisingBoxId) => async (dispatch, getState) => {
    dispatch({ type: ADVERTISING_BOX_DELETE_REQUEST, payload: advertisingBoxId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = Axios.delete(`/api/advertisingboxes/${advertisingBoxId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: ADVERTISING_BOX_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ADVERTISING_BOX_DELETE_FAIL, payload: message });
    }
  };