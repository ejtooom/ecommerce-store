import {   COVER_LIST_REQUEST,
    COVER_LIST_SUCCESS,
    COVER_LIST_FAIL,
    COVER_DETAILS_REQUEST,
    COVER_DETAILS_SUCCESS,
    COVER_DETAILS_FAIL,
    COVER_CREATE_REQUEST,
    COVER_CREATE_SUCCESS,
    COVER_CREATE_FAIL,
    COVER_CREATE_RESET,
    COVER_UPDATE_REQUEST,
    COVER_UPDATE_SUCCESS,
    COVER_UPDATE_FAIL,
    COVER_UPDATE_RESET,
    COVER_DELETE_REQUEST,
    COVER_DELETE_SUCCESS,
    COVER_DELETE_FAIL,
    COVER_DELETE_RESET, } from "../constants/coverConstants";


export const coverListReducer = (
    state= { loading: true, covers: []}, action) => {
    switch (action.type) {
        case COVER_LIST_REQUEST:
            return {loading: true};
        case COVER_LIST_SUCCESS:
            return {loading: false, covers: action.payload};
        case COVER_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const coverDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
      case COVER_DETAILS_REQUEST:
        return { loading: true };
      case COVER_DETAILS_SUCCESS:
        return { loading: false, cover: action.payload };
      case COVER_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  export const coverCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case COVER_CREATE_REQUEST:
        return { loading: true };
      case COVER_CREATE_SUCCESS:
        return { loading: false, success: true, cover: action.payload };
      case COVER_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case COVER_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  export const coverUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case COVER_UPDATE_REQUEST:
        return { loading: true };
      case COVER_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case COVER_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case COVER_UPDATE_RESET:
        return {};
      default:
        return state;
    }
  };
  export const coverDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case COVER_DELETE_REQUEST:
        return { loading: true };
      case COVER_DELETE_SUCCESS:
        return { loading: false, success: true };
      case COVER_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case COVER_DELETE_RESET:
        return {};
      default:
        return state;
    }
  };