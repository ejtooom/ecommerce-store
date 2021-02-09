import {   ADVERTISING_BOX_LIST_REQUEST,
    ADVERTISING_BOX_LIST_SUCCESS,
    ADVERTISING_BOX_LIST_FAIL,
    ADVERTISING_BOX_DETAILS_REQUEST,
    ADVERTISING_BOX_DETAILS_SUCCESS,
    ADVERTISING_BOX_DETAILS_FAIL,
    ADVERTISING_BOX_CREATE_REQUEST,
    ADVERTISING_BOX_CREATE_SUCCESS,
    ADVERTISING_BOX_CREATE_FAIL,
    ADVERTISING_BOX_CREATE_RESET,
    ADVERTISING_BOX_UPDATE_REQUEST,
    ADVERTISING_BOX_UPDATE_SUCCESS,
    ADVERTISING_BOX_UPDATE_FAIL,
    ADVERTISING_BOX_UPDATE_RESET,
    ADVERTISING_BOX_DELETE_REQUEST,
    ADVERTISING_BOX_DELETE_SUCCESS,
    ADVERTISING_BOX_DELETE_FAIL,
    ADVERTISING_BOX_DELETE_RESET, } from "../constants/advertisingBoxConstants";


export const advertisingBoxListReducer = (
    state= { loading: true, advertisingBoxes: []}, action) => {
    switch (action.type) {
        case ADVERTISING_BOX_LIST_REQUEST:
            return {loading: true};
        case ADVERTISING_BOX_LIST_SUCCESS:
            return {loading: false, advertisingBoxes: action.payload};
        case ADVERTISING_BOX_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const advertisingBoxDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
      case ADVERTISING_BOX_DETAILS_REQUEST:
        return { loading: true };
      case ADVERTISING_BOX_DETAILS_SUCCESS:
        return { loading: false, advertisingBox: action.payload };
      case ADVERTISING_BOX_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  export const advertisingBoxCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case ADVERTISING_BOX_CREATE_REQUEST:
        return { loading: true };
      case ADVERTISING_BOX_CREATE_SUCCESS:
        return { loading: false, success: true, advertisingBox: action.payload };
      case ADVERTISING_BOX_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case ADVERTISING_BOX_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  export const advertisingBoxUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case ADVERTISING_BOX_UPDATE_REQUEST:
        return { loading: true };
      case ADVERTISING_BOX_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case ADVERTISING_BOX_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case ADVERTISING_BOX_UPDATE_RESET:
        return {};
      default:
        return state;
    }
  };
  export const advertisingBoxDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case ADVERTISING_BOX_DELETE_REQUEST:
        return { loading: true };
      case ADVERTISING_BOX_DELETE_SUCCESS:
        return { loading: false, success: true };
      case ADVERTISING_BOX_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case ADVERTISING_BOX_DELETE_RESET:
        return {};
      default:
        return state;
    }
  };