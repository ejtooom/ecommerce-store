import {   INFOBOX_LIST_REQUEST,
    INFOBOX_LIST_SUCCESS,
    INFOBOX_LIST_FAIL,
    INFOBOX_DETAILS_REQUEST,
    INFOBOX_DETAILS_SUCCESS,
    INFOBOX_DETAILS_FAIL,
    INFOBOX_CREATE_REQUEST,
    INFOBOX_CREATE_SUCCESS,
    INFOBOX_CREATE_FAIL,
    INFOBOX_CREATE_RESET,
    INFOBOX_UPDATE_REQUEST,
    INFOBOX_UPDATE_SUCCESS,
    INFOBOX_UPDATE_FAIL,
    INFOBOX_UPDATE_RESET,
    INFOBOX_DELETE_REQUEST,
    INFOBOX_DELETE_SUCCESS,
    INFOBOX_DELETE_FAIL,
    INFOBOX_DELETE_RESET, } from "../constants/infoBoxConstants";


export const infoBoxListReducer = (
    state= { loading: true, infoBoxes: []}, action) => {
    switch (action.type) {
        case INFOBOX_LIST_REQUEST:
            return {loading: true};
        case INFOBOX_LIST_SUCCESS:
            return {loading: false, infoBoxes: action.payload};
        case INFOBOX_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const infoBoxDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
      case INFOBOX_DETAILS_REQUEST:
        return { loading: true };
      case INFOBOX_DETAILS_SUCCESS:
        return { loading: false, infoBox: action.payload };
      case INFOBOX_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  export const infoBoxCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case INFOBOX_CREATE_REQUEST:
        return { loading: true };
      case INFOBOX_CREATE_SUCCESS:
        return { loading: false, success: true, infoBox: action.payload };
      case INFOBOX_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case INFOBOX_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  export const infoBoxUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case INFOBOX_UPDATE_REQUEST:
        return { loading: true };
      case INFOBOX_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case INFOBOX_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case INFOBOX_UPDATE_RESET:
        return {};
      default:
        return state;
    }
  };
  export const infoBoxDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case INFOBOX_DELETE_REQUEST:
        return { loading: true };
      case INFOBOX_DELETE_SUCCESS:
        return { loading: false, success: true };
      case INFOBOX_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case INFOBOX_DELETE_RESET:
        return {};
      default:
        return state;
    }
  };