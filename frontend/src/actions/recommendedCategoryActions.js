import Axios from 'axios';
import {   RECOMMENDED_CATEGORY_CREATE_FAIL,
    RECOMMENDED_CATEGORY_CREATE_REQUEST,
    RECOMMENDED_CATEGORY_CREATE_SUCCESS,
    RECOMMENDED_CATEGORY_DETAILS_FAIL,
    RECOMMENDED_CATEGORY_DETAILS_REQUEST,
    RECOMMENDED_CATEGORY_DETAILS_SUCCESS,
    RECOMMENDED_CATEGORY_LIST_FAIL,
    RECOMMENDED_CATEGORY_LIST_REQUEST,
    RECOMMENDED_CATEGORY_LIST_SUCCESS,
    RECOMMENDED_CATEGORY_UPDATE_REQUEST,
    RECOMMENDED_CATEGORY_UPDATE_SUCCESS,
    RECOMMENDED_CATEGORY_UPDATE_FAIL,
    RECOMMENDED_CATEGORY_DELETE_REQUEST,
    RECOMMENDED_CATEGORY_DELETE_FAIL,
    RECOMMENDED_CATEGORY_DELETE_SUCCESS, } from '../constants/recommendedCategoryConstants';

export const listRecommendedCategories = () => async (dispatch) => {
    dispatch({ type: RECOMMENDED_CATEGORY_LIST_REQUEST });
    try {
        const { data } = await Axios.get("/api/recommendedcategories");
        dispatch({ type: RECOMMENDED_CATEGORY_LIST_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({ type: RECOMMENDED_CATEGORY_LIST_FAIL, payload: error.message })
    }
}

export const detailsRecommendedCategory = (recommendedCategoryId) => async (dispatch) => {
    dispatch({ type: RECOMMENDED_CATEGORY_DETAILS_REQUEST, payload: recommendedCategoryId });
    try {
      const { data } = await Axios.get(`/api/recommendedcategories/${recommendedCategoryId}`);
      dispatch({ type: RECOMMENDED_CATEGORY_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: RECOMMENDED_CATEGORY_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const createRecommendedCategory = () => async (dispatch, getState) => {
    dispatch({ type: RECOMMENDED_CATEGORY_CREATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        '/api/recommendedcategories',
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: RECOMMENDED_CATEGORY_CREATE_SUCCESS,
        payload: data.recommendedCategory,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: RECOMMENDED_CATEGORY_CREATE_FAIL, payload: message });
    }
  };

  export const updateRecommendedCategory = (recommendedCategory) => async (dispatch, getState) => {
    dispatch({ type: RECOMMENDED_CATEGORY_UPDATE_REQUEST, payload: recommendedCategory });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.put(`/api/recommendedcategories/${recommendedCategory._id}`, recommendedCategory, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: RECOMMENDED_CATEGORY_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: RECOMMENDED_CATEGORY_UPDATE_FAIL, error: message });
    }
  };

  export const deleteRecommendedCategory = (recommendedCategoryId) => async (dispatch, getState) => {
    dispatch({ type: RECOMMENDED_CATEGORY_DELETE_REQUEST, payload: recommendedCategoryId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = Axios.delete(`/api/recommendedcategories/${recommendedCategoryId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: RECOMMENDED_CATEGORY_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: RECOMMENDED_CATEGORY_DELETE_FAIL, payload: message });
    }
  };
