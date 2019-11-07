import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import MainTabNavigator from './MainTabNavigator';
import ProductDetailScreen from '../product/ProductDetails';
import CartScreen from '../product/Cart';
import CheckOutView from '../checkout/CheckoutView';
import PaymentView from '../checkout/PaymentView';
import OpeningView from '../animation/OpeningView';
import CountryView from '../country/CountryView';
import ChatView from '../chat/ChatView';
// import ProductTabNavigator from './ProductTabNavigator';
import LoginScreen from '../auth/LoginView';
import CheckLogin from '../auth/CheckLogin';
// import CheckLogin from '../auth/CheckLogin';
// import HomeScreen from '../home/HomeView';
// import ProfileScreen from '../profile/Profile';
// import SelectCountry from '../selectCountry/SelectCountry';
// import GridsScreen from '../grids/GridsViewContainer';

// import ProductDetailScreen from '../product/ProductDetails';
// import CartScreen from '../product/Cart';

const stackNavigator = createStackNavigator(
  {
    
    OpeningView: {
      screen: OpeningView,
      navigationOptions: {
          header: null,
    },
  },
    CountryView: {
      screen: CountryView,
      navigationOptions: {
        headerLeft: null
          // header: null,
    },
  },
  Main: {
    screen: MainTabNavigator,
    navigationOptions: {
      header: null,
    },
  },
    
    ProductDetail: {
        screen: ProductDetailScreen,
        navigationOptions: {
            header: null,
        },
    },
    Cart: {
        screen: CartScreen,
        navigationOptions: {
            header: null,
        },
    },
    ChatView: {
        screen: ChatView,
        navigationOptions: {
            header: null,
        },
    },
  //   OpeningView: {
  //     screen: OpeningView,
  //     navigationOptions: {
  //         header: null,
  //   },
  // },
    // Checkout: {
    //     screen: CheckOutView,
    //     navigationOptions: {
    //         header: null,
    //     },
    // },
    // Payment: {
    //   screen: PaymentView,
    //   navigationOptions: {
    //       header: null,
    //   },
    // },
    // Login: {
    //   screen: LoginScreen,
    //   navigationOptions: {
    //       header: null,
    //   },
    // },
    // Home: {
    //   screen: HomeScreen,
    //   navigationOptions: {
    //     header: null,
    //   },
    // },
  },
);


export default createAppContainer(stackNavigator);
