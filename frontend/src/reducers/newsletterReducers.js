import {   NEWSLETTER_LIST_REQUEST,
    NEWSLETTER_LIST_SUCCESS,
    NEWSLETTER_LIST_FAIL,
    NEWSLETTER_DETAILS_REQUEST,
    NEWSLETTER_DETAILS_SUCCESS,
    NEWSLETTER_DETAILS_FAIL,
    NEWSLETTER_CREATE_REQUEST,
    NEWSLETTER_CREATE_SUCCESS,
    NEWSLETTER_CREATE_FAIL,
    NEWSLETTER_CREATE_RESET,
    NEWSLETTER_DELETE_REQUEST,
    NEWSLETTER_DELETE_SUCCESS,
    NEWSLETTER_DELETE_FAIL,
    NEWSLETTER_DELETE_RESET, } from "../constants/newsletterConstants";


export const newsletterListReducer = (
    state= { loading: true, newsletters: []}, action) => {
    switch (action.type) {
        case NEWSLETTER_LIST_REQUEST:
            return {loading: true};
        case NEWSLETTER_LIST_SUCCESS:
            return {loading: false, newsletters: action.payload};
        case NEWSLETTER_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const newsletterDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
      case NEWSLETTER_DETAILS_REQUEST:
        return { loading: true };
      case NEWSLETTER_DETAILS_SUCCESS:
        return { loading: false, newsletter: action.payload };
      case NEWSLETTER_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const newsletterCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case NEWSLETTER_CREATE_REQUEST:
        return { loading: true };
      case NEWSLETTER_CREATE_SUCCESS:
        return { loading: false, success: true, newsletter: action.payload };
      case NEWSLETTER_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case NEWSLETTER_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };

  export const newsletterDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case NEWSLETTER_DELETE_REQUEST:
        return { loading: true };
      case NEWSLETTER_DELETE_SUCCESS:
        return { loading: false, success: true };
      case NEWSLETTER_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case NEWSLETTER_DELETE_RESET:
        return {};
      default:
        return state;
    }
  };