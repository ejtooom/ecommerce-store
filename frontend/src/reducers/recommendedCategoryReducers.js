import {   RECOMMENDED_CATEGORY_LIST_REQUEST,
    RECOMMENDED_CATEGORY_LIST_SUCCESS,
    RECOMMENDED_CATEGORY_LIST_FAIL,
    RECOMMENDED_CATEGORY_DETAILS_REQUEST,
    RECOMMENDED_CATEGORY_DETAILS_SUCCESS,
    RECOMMENDED_CATEGORY_DETAILS_FAIL,
    RECOMMENDED_CATEGORY_CREATE_REQUEST,
    RECOMMENDED_CATEGORY_CREATE_SUCCESS,
    RECOMMENDED_CATEGORY_CREATE_FAIL,
    RECOMMENDED_CATEGORY_CREATE_RESET,
    RECOMMENDED_CATEGORY_UPDATE_REQUEST,
    RECOMMENDED_CATEGORY_UPDATE_SUCCESS,
    RECOMMENDED_CATEGORY_UPDATE_FAIL,
    RECOMMENDED_CATEGORY_UPDATE_RESET,
    RECOMMENDED_CATEGORY_DELETE_REQUEST,
    RECOMMENDED_CATEGORY_DELETE_SUCCESS,
    RECOMMENDED_CATEGORY_DELETE_FAIL,
    RECOMMENDED_CATEGORY_DELETE_RESET, } from "../constants/recommendedCategoryConstants";

export const recommendedCategoryListReducer = (
    state= { loading: true, recommendedCategories: []}, action) => {
    switch (action.type) {
        case RECOMMENDED_CATEGORY_LIST_REQUEST:
            return {loading: true};
        case RECOMMENDED_CATEGORY_LIST_SUCCESS:
            return {loading: false, recommendedCategories: action.payload};
        case RECOMMENDED_CATEGORY_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const recommendedCategoryDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
      case RECOMMENDED_CATEGORY_DETAILS_REQUEST:
        return { loading: true };
      case RECOMMENDED_CATEGORY_DETAILS_SUCCESS:
        return { loading: false, recommendedCategory: action.payload };
      case RECOMMENDED_CATEGORY_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const recommendedCategoryCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case RECOMMENDED_CATEGORY_CREATE_REQUEST:
        return { loading: true };
      case RECOMMENDED_CATEGORY_CREATE_SUCCESS:
        return { loading: false, success: true, recommendedCategory: action.payload };
      case RECOMMENDED_CATEGORY_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case RECOMMENDED_CATEGORY_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };

  export const recommendedCategoryUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case RECOMMENDED_CATEGORY_UPDATE_REQUEST:
        return { loading: true };
      case RECOMMENDED_CATEGORY_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case RECOMMENDED_CATEGORY_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case RECOMMENDED_CATEGORY_UPDATE_RESET:
        return {};
      default:
        return state;
    }
  };

  export const recommendedCategoryDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case RECOMMENDED_CATEGORY_DELETE_REQUEST:
        return { loading: true };
      case RECOMMENDED_CATEGORY_DELETE_SUCCESS:
        return { loading: false, success: true };
      case RECOMMENDED_CATEGORY_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case RECOMMENDED_CATEGORY_DELETE_RESET:
        return {};
      default:
        return state;
    }
  };