import React from 'react';
import { Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from '../home/HomeView';
import LoginScreen from '../auth/LoginView';
import CheckLogin from '../auth/CheckLogin';
import ProfileScreen from '../profile/ProfileView';
import CheckOutScreen from '../checkout/CheckoutView';
import CartScreen from '../product/Cart';
import PaymentScreen from '../checkout/PaymentView';
import HistoryScreen from '../history/HistoryView';

const iconHome = require('../../assets/images/tabbar/home.png');
const iconPromo = require('../../assets/images//tabbar/promo.png');
const iconStore = require('../../assets/images//tabbar/store.png');
const iconWishlist = require('../../assets/images//tabbar/wishlist.png');
const iconAccount = require('../../assets/images//tabbar/account.png');

const HomeTab = createStackNavigator(
    {
      Home: HomeScreen ,
      Login: LoginScreen,
      Checkout: CheckOutScreen,
      Cart : CartScreen,
      Payment: PaymentScreen,
      // Profile: ProfileScreen,
    },
    {
      // initialRouteName:'HomeScreen',
      defaultNavigationOptions: {
        header: null,
      },
    }
  );
  const AccountTab = createStackNavigator(
    {
      CheckLogin: CheckLogin ,
      Login: LoginScreen,
      Profile: ProfileScreen,
      History: HistoryScreen,
    },
    {
      initialRouteName:'CheckLogin',
      defaultNavigationOptions: {
        header: null,
      },
    }
  );
//   const ProductTab = createStackNavigator(
//     {
//       Product: GridsScreen ,
//       ProductDetail: ProductDetailScreen,
//       Cart: CartScreen,
//     },
//     {
//       initialRouteName:'Product',
//       defaultNavigationOptions: {
//         header: null,
//       },
//     }
//   );

const MainApp = createBottomTabNavigator(
    {
      Home: HomeTab ,
    //   Promo: CategoryScreen,
    //   Store: ProductTab,
    //   Wishlist: ComponentsScreen,
      Account: AccountTab,
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          if (routeName === 'Home') {
            return (
              <Image
                source={ iconHome } />
            );
          }
          else if (routeName === 'Promo') {
            return (
              <Image
                source={ iconPromo } />
            );
          } 
          else if (routeName === 'Store') {
            return (
              <Image
                source={ iconStore } />
            );
          }
          else if (routeName === 'Wishlist') {
            return (
              <Image
                source={ iconWishlist } />
            );
          }
          else if (routeName === 'Account') {
            return (
              <Image
                source={ iconAccount } />
            );
          }  
        },
      }),
      tabBarOptions: {
        activeTintColor: '#FF6F00',
        inactiveTintColor: '#263238',
      },
    }
  );

  export default createAppContainer(MainApp);