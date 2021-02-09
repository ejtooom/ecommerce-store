import { applyMiddleware, createStore, compose, combineReducers } from 'redux'; 
import thunk from 'redux-thunk';
import { advertisingBoxCreateReducer, advertisingBoxDeleteReducer, advertisingBoxDetailsReducer, advertisingBoxListReducer, advertisingBoxUpdateReducer } from './reducers/boxReducers';
import { cartReducer } from './reducers/cartReducers';
import { recommendedCategoryCreateReducer, recommendedCategoryDeleteReducer, recommendedCategoryDetailsReducer, recommendedCategoryListReducer, recommendedCategoryUpdateReducer } from './reducers/recommendedCategoryReducers';
import { coverCreateReducer, coverDeleteReducer, coverDetailsReducer, coverListReducer, coverUpdateReducer } from './reducers/coverReducers';
import { orderCreateReducer, orderDeleteReducer, orderDeliverReducer, orderDetailsReducer, orderListReducer, orderMineListReducer, orderPayReducer } from './reducers/orderReducers';
import { 
    productBrandListReducer,
    productCategoryListReducer,
    productCreateReducer,
    productDeleteReducer,
    productDetailsReducer,
    productListReducer, 
    productUpdateReducer
} from './reducers/productReducers';
import { userAddressMapReducer, userDeleteReducer, userDetailsReducer, userListReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer, userUpdateReducer } from './reducers/userReducers';
import { infoBoxCreateReducer, infoBoxDeleteReducer, infoBoxDetailsReducer, infoBoxListReducer, infoBoxUpdateReducer } from './reducers/infoBoxReducers';
import { bannerCreateReducer, bannerDeleteReducer, bannerDetailsReducer, bannerListReducer, bannerUpdateReducer } from './reducers/bannerReducers';
import { newsletterCreateReducer, newsletterDeleteReducer, newsletterDetailsReducer, newsletterListReducer } from './reducers/newsletterReducers';
import { contactFormCreateReducer, contactFormDeleteReducer, contactFormDetailsReducer, contactFormListReducer, contactFormMineListReducer } from './reducers/contactFormReducers';

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo') 
        ? JSON.parse(localStorage.getItem('userInfo')) 
        : null,
    },
    cart: {
        cartItems: localStorage.getItem('cartItems') 
        ? JSON.parse(localStorage.getItem('cartItems')) 
        : [],
        shippingAddress: localStorage.getItem('shippingAddress') 
        ? JSON.parse(localStorage.getItem('shippingAddress')) 
        : {},
        invoiceAddress: localStorage.getItem('invoiceAddress') 
        ? JSON.parse(localStorage.getItem('invoiceAddress')) 
        : {},
        paymentMethod: 'PayPal'
    }
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userUpdate: userUpdateReducer,
    coverList: coverListReducer,
    coverDetails: coverDetailsReducer,
    coverCreate: coverCreateReducer,
    coverUpdate: coverUpdateReducer,
    coverDelete: coverDeleteReducer,
    bannerList: bannerListReducer,
    bannerDetails: bannerDetailsReducer,
    bannerCreate: bannerCreateReducer,
    bannerUpdate: bannerUpdateReducer,
    bannerDelete: bannerDeleteReducer,
    infoBoxList: infoBoxListReducer,
    infoBoxDetails: infoBoxDetailsReducer,
    infoBoxCreate: infoBoxCreateReducer,
    infoBoxUpdate: infoBoxUpdateReducer,
    infoBoxDelete: infoBoxDeleteReducer,
    advertisingBoxList: advertisingBoxListReducer,
    advertisingBoxDetails: advertisingBoxDetailsReducer,
    advertisingBoxCreate: advertisingBoxCreateReducer,
    advertisingBoxUpdate: advertisingBoxUpdateReducer,
    advertisingBoxDelete: advertisingBoxDeleteReducer,
    recommendedCategoryList: recommendedCategoryListReducer,
    recommendedCategoryDetails: recommendedCategoryDetailsReducer,
    recommendedCategoryCreate: recommendedCategoryCreateReducer,
    recommendedCategoryUpdate: recommendedCategoryUpdateReducer,
    recommendedCategoryDelete: recommendedCategoryDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderDeliver: orderDeliverReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    productCategoryList: productCategoryListReducer,
    productBrandList: productBrandListReducer,
    userAddressMap: userAddressMapReducer,
    newsletterList: newsletterListReducer,
    newsletterDetails: newsletterDetailsReducer,
    newsletterCreate: newsletterCreateReducer,
    newsletterDelete: newsletterDeleteReducer,
    contactFormList: contactFormListReducer,
    contactFormMineList: contactFormMineListReducer,
    contactFormDetails: contactFormDetailsReducer,
    contactFormCreate: contactFormCreateReducer,
    contactFormDelete: contactFormDeleteReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk))
);

export default store;