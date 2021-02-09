import {   CONTACTFORM_LIST_REQUEST,
    CONTACTFORM_LIST_SUCCESS,
    CONTACTFORM_LIST_FAIL,
    CONTACTFORM_DETAILS_REQUEST,
    CONTACTFORM_DETAILS_SUCCESS,
    CONTACTFORM_DETAILS_FAIL,
    CONTACTFORM_CREATE_REQUEST,
    CONTACTFORM_CREATE_SUCCESS,
    CONTACTFORM_CREATE_FAIL,
    CONTACTFORM_CREATE_RESET,
    CONTACTFORM_DELETE_REQUEST,
    CONTACTFORM_DELETE_SUCCESS,
    CONTACTFORM_DELETE_FAIL,
    CONTACTFORM_DELETE_RESET,
    CONTACTFORM_MINE_LIST_REQUEST,
    CONTACTFORM_MINE_LIST_FAIL,
    CONTACTFORM_MINE_LIST_SUCCESS, } from "../constants/contactFormConstants";


export const contactFormListReducer = (state= { loading: true, contactForms: []}, action) => {
  switch (action.type) {
    case CONTACTFORM_LIST_REQUEST:
        return {loading: true};
    case CONTACTFORM_LIST_SUCCESS:
        return {loading: false, contactForms: action.payload.contactForms, pages: action.payload.pages, page: action.payload.page};
    case CONTACTFORM_LIST_FAIL:
        return {loading: false, error: action.payload};
    default:
        return state;
  }
}

export const contactFormMineListReducer = (state = { loading: true, contactForms: [] }, action) => {
  switch (action.type) {
    case CONTACTFORM_MINE_LIST_REQUEST:
      return { loading: true };
    case CONTACTFORM_MINE_LIST_SUCCESS:
      return { loading: false, contactForms: action.payload.contactForms, pages: action.payload.pages, page: action.payload.page};
    case CONTACTFORM_MINE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const contactFormDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
      case CONTACTFORM_DETAILS_REQUEST:
        return { loading: true };
      case CONTACTFORM_DETAILS_SUCCESS:
        return { loading: false, contactForm: action.payload };
      case CONTACTFORM_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const contactFormCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case CONTACTFORM_CREATE_REQUEST:
        return { loading: true };
      case CONTACTFORM_CREATE_SUCCESS:
        return { loading: false, success: true, contactForm: action.payload };
      case CONTACTFORM_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case CONTACTFORM_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };

  export const contactFormDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case CONTACTFORM_DELETE_REQUEST:
        return { loading: true };
      case CONTACTFORM_DELETE_SUCCESS:
        return { loading: false, success: true };
      case CONTACTFORM_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case CONTACTFORM_DELETE_RESET:
        return {};
      default:
        return state;
    }
  };