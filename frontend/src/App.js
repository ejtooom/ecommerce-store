import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import ScrollToTop from './components/ScrollToTop';
import BottomNavbar from './components/Navigation/BottomNavbar';
import MiddleNavbar from './components/Navigation/MiddleNavbar';
import TopNavbar from './components/Navigation/TopNavbar';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import CartScreen from './containers/Screens/CartScreen';
import CategoryScreen from './containers/Screens/CategoryScreen';
import OrderHistoryScreen from './containers/Screens/OrderHistoryScreen';
import OrderScreen from './containers/Screens/OrderScreen';
import PaymentMethodScreen from './containers/Screens/PaymentMethodScreen';
import PlaceOrderScreen from './containers/Screens/PlaceOrderScreen';
import ProductScreen from './containers/Screens/ProductScreen';
import ProfileScreen from './containers/Screens/ProfileScreen';
import RegisterScreen from './containers/Screens/RegisterScreen';
import ShippingAddressScreen from './containers/Screens/ShippingAddressScreen';
import SigninScreen from './containers/Screens/SigninScreen';
import HomeScreen from './containers/Screens/HomeScreen';
import ProductListScreen from './containers/Screens/ProductListScreen';
import ProductEditScreen from './containers/Screens/ProductEditScreen';
import OrderListScreen from './containers/Screens/OrderListScreen';
import UserListScreen from './containers/Screens/UserListScreen';
import UserEditScreen from './containers/Screens/UserEditScreen';
import SearchScreen from './containers/Screens/SearchScreen';
import MapScreen from './containers/Screens/MapScreen';
import ShippingMethodScreen from './containers/Screens/ShippingMethodScreen';
import SettingsScreen from './containers/Screens/SettingsScreen';
import CoverEditScreen from './containers/Screens/CoverEditScreen';
import CoverListScreen from './containers/Screens/CoverListScreen';
import RecommendedCategoryListScreen from './containers/Screens/RecommendedCategoryListScreen';
import RecommendedCategoryEditScreen from './containers/Screens/RecommendedCategoryEditScreen';
import AdvertisingBoxListScreen from './containers/Screens/AdvertisingBoxListScreen';
import AdvertisingBoxEditScreen from './containers/Screens/AdvertisingBoxEditScreen';
import AccountDetailsScreen from './containers/Screens/AccountDetailsScreen';
import UserInvoiceAddressScreen from './containers/Screens/UserInvoiceAddressScreen';
import InfoBoxListScreen from './containers/Screens/InfoBoxListScreen';
import InfoBoxEditScreen from './containers/Screens/InfoBoxEditScreen';
import SubcategoryScreen from './containers/Screens/SubcategoryScreen';
import BannerListScreen from './containers/Screens/BannerListScreen';
import BannerEditScreen from './containers/Screens/BannerEditScreen';
import Footer from './components/Footer';
import PrivacyPolicy from './containers/Screens/PrivacyPolicyScreen';
import ConditionOfPurchase from './containers/Screens/ConditionOfPurchaseScreen';
import ReturnPolicy from './containers/Screens/ReturnPolicyScreen';
import LoyaltyProgram from './containers/Screens/LoyaltyProgramScreen';
import NewsletterListScreen from './containers/Screens/NewsletterListScreen';
import ContactUsScreen from './containers/Screens/ContactUsScreen';
import AdminMessageListScreen from './containers/Screens/AdminMessageListScreen';
import AboutUsScreen from './containers/Screens/AboutUsScreen';
import MessageDetailsScreen from './containers/Screens/MessageDetailsScreen';

function App() {

  return (
    <Router>
      <ScrollToTop />
      <div>
        <TopNavbar />
        <MiddleNavbar />
        <BottomNavbar />
        <Route path="/contact-us" component={ContactUsScreen}></Route>
        <Route path="/about-us" component={AboutUsScreen}></Route>
        <Route path="/privacy-policy" component={PrivacyPolicy}></Route>
        <Route path="/conditions-of-purchase" component={ConditionOfPurchase}></Route>
        <Route path="/return-policy" component={ReturnPolicy}></Route>
        <Route path="/loyalty-program" component={LoyaltyProgram}></Route>
        <Route path="/cart/:id?" component={CartScreen}></Route>
        <Route path="/product/:id" exact component={ProductScreen}></Route>
        <Route path="/product/:id/edit" exact component={ProductEditScreen}></Route>
        <Route path="/signin" component={SigninScreen}></Route>
        <Route path="/register" component={RegisterScreen}></Route>
        <Route path="/shipping" component={ShippingAddressScreen}></Route>
        <Route path="/shippingmethod" component={ShippingMethodScreen}></Route>
        <Route path="/payment" component={PaymentMethodScreen}></Route>
        <Route path="/placeorder" component={PlaceOrderScreen}></Route>
        <Route path="/order/:id" component={OrderScreen}></Route>
        <Route path="/message/:id" component={MessageDetailsScreen}></Route>
        <Route path="/orderhistory" exact component={OrderHistoryScreen}></Route>
        <Route path="/orderhistory/pageNumber/:pageNumber" component={OrderHistoryScreen}></Route>
        <Route path="/products/:category" exact component={CategoryScreen}></Route>
        <Route path="/products/sub/:subcategory" exact component={SubcategoryScreen}></Route>
        <Route
            path="/search/name/:name?"
            component={SearchScreen}
            exact
        ></Route>
          <Route
            path="/search/category/:category"
            component={SearchScreen}
            exact
        ></Route>
        <Route
            path="/search/brand/:brand"
            component={SearchScreen}
            exact
        ></Route>
          <Route
            path="/search/category/:category/brand/:brand/name/:name"
            component={SearchScreen}
            exact
        ></Route>
          <Route
            path="/search/category/:category/brand/:brand/name/:name/min/:min/max/:max/order/:order"
            component={SearchScreen}
            exact
        ></Route>
        <PrivateRoute path="/accountdetails" exact component={AccountDetailsScreen}></PrivateRoute>
        <PrivateRoute path="/accountdetails/userprofile" exact component={ProfileScreen}></PrivateRoute>
        <PrivateRoute path="/accountdetails/invoiceaddress" exact component={UserInvoiceAddressScreen}></PrivateRoute>
        <PrivateRoute path="/map" component={MapScreen}></PrivateRoute>
        <AdminRoute path="/productlist" component={ProductListScreen}></AdminRoute>
        <AdminRoute path="/orderlist" exact component={OrderListScreen}></AdminRoute>
        <AdminRoute path="/orderlist/pageNumber/:pageNumber" component={OrderListScreen}></AdminRoute>
        <AdminRoute path="/userlist" exact component={UserListScreen}></AdminRoute>
        <AdminRoute path="/userlist/pageNumber/:pageNumber" component={UserListScreen}></AdminRoute>
        <AdminRoute path="/user/:id/edit" component={UserEditScreen}></AdminRoute>
        <AdminRoute path="/admin-messagelist" exact component={AdminMessageListScreen}></AdminRoute>
        <AdminRoute path="/admin-messagelist/pageNumber/:pageNumber" component={AdminMessageListScreen}></AdminRoute>
        <AdminRoute path="/settings" exact component={SettingsScreen}></AdminRoute>
        <AdminRoute path="/settings/coverlist" exact component={CoverListScreen}></AdminRoute>
        <AdminRoute path="/settings/cover/:id/edit" exact component={CoverEditScreen}></AdminRoute>
        <AdminRoute path="/settings/bannerlist" exact component={BannerListScreen}></AdminRoute>
        <AdminRoute path="/settings/banner/:id/edit" exact component={BannerEditScreen}></AdminRoute>
        <AdminRoute path="/settings/infoboxlist" exact component={InfoBoxListScreen}></AdminRoute>
        <AdminRoute path="/settings/infobox/:id/edit" exact component={InfoBoxEditScreen}></AdminRoute>
        <AdminRoute path="/settings/recommendedcategorylist" exact component={RecommendedCategoryListScreen}></AdminRoute>
        <AdminRoute path="/settings/recommendedcategory/:id/edit" exact component={RecommendedCategoryEditScreen}></AdminRoute>
        <AdminRoute path="/settings/advertisingboxlist" exact component={AdvertisingBoxListScreen}></AdminRoute>
        <AdminRoute path="/settings/advertisingbox/:id/edit" exact component={AdvertisingBoxEditScreen}></AdminRoute>
        <AdminRoute path="/settings/newsletterlist" exact component={NewsletterListScreen}></AdminRoute>
        <Route path="/" exact component={HomeScreen}></Route>
        <Footer />
      </div>
    </Router>

  );
}

export default App;