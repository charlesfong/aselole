import React, { Component } from 'react';
import { ScrollView, Switch, StyleSheet, Text, View, Dimensions, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Avatar, ListItem } from 'react-native-elements';
// import { HeaderBackButton } from 'react-navigation';
import BaseIcon from './Icon';
import LinearGradient from 'react-native-linear-gradient';
import { StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { BackHandler } from 'react-native';
import Moment from 'moment';
import logoWKM from '../../assets/images/logoWKM.png'
// import { getStatusBarHeight } from 'react-native-status-bar-height';
 
// 44 - on iPhoneX
// 20 - on iOS device
// X - on Android platfrom (runtime value)
// 0 - on all other platforms (default)
// console.log(getStatusBarHeight());
 
// will be 0 on Android, because You pass true to skipAndroid
// console.log(getStatusBarHeight(true));


const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'white',
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
  },
  userImage: {
    marginRight: 20,
  },
  listItemContainer: {
    height: 75,
    borderWidth: 0.5,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderColor: '#707070',
  },
  titleStyle: {
    color: '#2B2B2B',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitleStyle: {
    fontSize: 11,
    color: '#505B6F',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex:1,
  },
  containerImg: {
    flex: 1,
    width: '92%',
    backgroundColor: 'transparent',
    zIndex: 2,
    position: 'relative',
    height: 700,
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
    elevation: 5,
    shadowOpacity: 1,
    padding: 0,
    marginTop: 15,
    marginBottom: 15,
  },
  logoWKM: {
    zIndex: 2,
    alignSelf: 'center',
    resizeMode: 'contain',
    width: '70%',
  },
})


export default class AccountInfoScreen extends Component {
  

  static navigationOptions = ({navigation}) => {
    return{
      header: null,
      headerTitle: "Akun",
      headerTitleStyle: {
        color: 'white'
      },
   }
  }

  state = {
    pushNotifications: true,
    profileData: [],
    country:"",
  }

  componentDidMount() {
    AsyncStorage.getItem('user', (error, result) => {
      if (result) {
          this.setState({ profileData: JSON.parse(result)}, () => {
              // console.warn(result);
          });
      }
    });
    AsyncStorage.getItem('country_selected', (error, result) => {
      if (result) {
          var a = JSON.parse(result);
          this.setState({ country: a }, () => {
            // console.warn(this.state.country);
          });
          // console.warn(a);
      }
    });
    // console.warn(this.state.country);
  }

  logout = () => {
    AsyncStorage.removeItem('user');
    this.props.navigation.replace('CheckLogin');
  }

  onPressOptions = () => {
    this.props.navigation.navigate('options');
  }
  
  gotoHistory = (status) => {
    this.props.navigation.navigate('History', {status: status});
  }

  onChangePushNotifications = () => {
    this.setState(state => ({
      pushNotifications: !state.pushNotifications,
    }))
    console.warn(this.state.pushNotifications);
  }

  // ComingSoon = () => {
  //   console.warn("Coming Soon");
  // }

  render() {
    // const {name} = this.state.profileData
    Moment.locale('en');
    return (
      
      <ScrollView style={styles.scroll}>
          <LinearGradient colors={["#048c4c","#82bf26"]}  style={{flex: 1}}>
      <StatusBar backgroundColor="green" barStyle="light-content" />
  </LinearGradient >

      <ListItem
            containerStyle={{
              height:70,
              elevation: 25,
              shadowOpacity: 1,
              padding: 10,
            }}
            title={this.state.country=="id" ?
              "Informasi Akun" : 
              "Account Information"}
            titleStyle={{
              color: 'black',
              fontSize: 22,
              fontWeight: 'bold',
              letterSpacing: 0.5,
              top: 10,
              alignSelf: 'center',
              marginRight: 40,
            }}
          leftIcon={(
            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
            <BaseIcon
              containerStyle={{
                backgroundColor: 'transparent',
                marginRight: 0,
                marginLeft: 0,
                top: 10,
                flex: 1,
                zIndex: 5,
              }}
              icon={{
                type: 'ionicon',
                name: 'ios-arrow-back',
                color: '#27cf8b',
                size: 30,
              }}
            />
          </TouchableOpacity>
          )}
        />
      
      <View style={styles.container}>
      </View>

      <View style={styles.containerImg}>
          <Image source={logoWKM} style={styles.logoWKM} />
          <Text
            style={{
              color: 'black',
              fontSize: 12,
              lineHeight: 15,
              position: 'absolute',
              zIndex: 5,
              padding: 15,
              top: 115,
            }}>WAKI International Grup telah berdiri sejak tahun 1995 dengan berpusat di WAKI Tower, Kuala Lumpur Malaysia. 
            WAKI telah terkenal sebagai salah satu merk alat kesehatan paling populer di kawasan Asia Pasific. 
            WAKI telah mempunyai banyak cabang diantaranya berada di 
            Negara Malaysia, Indonesia, Philippines, Thailand, Singapore, Vietnam, Cambodia, Myanmar, Hongkong, Japan, Korea Selatan dan China.
            {"\n"}{"\n"}
            Merk WAKI adalah merk alat kesehatan yang paling popular. 
            Tujuan WAKI adalah untuk terus menciptakan nilai tambah untuk konsumen. 
            WAKI percaya bahwa inovasi akan menghasilkan peluang yang tak terbatas. 
            Misi dari WAKI adalah membawa semua anggota dan konsumen WAKI menuju kehidupan yang lebih baik.
            {"\n"}{"\n"}
            WAKIMart adalah sebagai salah satu anak perusahaan yang baru didirikan di tahun 2019. 
            WAKiMart akan mengembangkan sayapnya di bidang supermarket digital dengan menyediakan semua produk - produk berkualitas
            dan terbaik dengan harga terjangkau, untuk memenuhi kebutuhan dari mulai bayi sampai dengan orang tua, 
            dengan satu merk produk, yaitu “WAKI”. 
            WAKIMart mempunyai prinsip untuk terus memberikan keuntungan dan peluang bisnis bagi seluruh anggota, 
            tidak terbatas pada tempat dan waktu.
            {"\n"}{"\n"}
            Untuk segala kebutuhan kita, selalu ingatlah akan WAKIMart. 
            Karena di WAKiMart “Setiap hari untung, setiap hari Happy. 
            Bukan Janji tapi Pasti”.
            {"\n"}{"\n"}
            Visi kami{"\n"}
            Untuk memberikan keuntungan dan peluang bisnis bagi semua member WAKIMart untuk menuju kehidupan yang lebih baik. 
            Setiap hari untung, setiap hari Happy. Bukan Janji tapi Pasti.
            {"\n"}{"\n"}
          </Text>
          
      </View>
          

      
      </ScrollView>
    )
  }
}
