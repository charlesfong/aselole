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
  oval: {
    width: Dimensions.get('window').width/1.5,
    height: 350,
    borderBottomLeftRadius: 110,
    borderBottomRightRadius: 110,
    backgroundColor: 'transparent',
    elevation: 20,
    shadowOpacity: 0.7,
    transform: [
      {scaleX: 2}
    ]
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
    height: 245,
    top: -335,
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
    elevation: 5,
    shadowOpacity: 1,
    padding: 0,
  },
  vcImg:{
    width: '114.5%',
    alignSelf: 'center',
    margin: 0,
    padding: 0,
  },
  containerText: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: '#fafafa',
    zIndex: 2,
    position: 'relative',
    height: 275,
    top: -320,
    width: '92%',
    borderRadius: 15,
    elevation: 5,
    shadowOpacity: 1,
  },
  
})


export default class AboutScreen extends Component {
  

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

  constructor(props) {
    super(props);
    this.backButtonClick = this.backButtonClick.bind(this);
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backButtonClick);
  }

  backButtonClick() {
    if (this.props.navigation && this.props.navigation.goBack) {
      this.props.navigation.goBack(null);
      return true;
    }
    return false;
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
      <StatusBar translucent={true} backgroundColor={'transparent'} />
  </LinearGradient >

      <ListItem
            containerStyle={{
              height:70,
              elevation: 25,
              shadowOpacity: 1,
            }}
            title={this.state.country=="id" ?
              "Kartu Virtual" : 
              "Virtual Card"}
            linearGradientProps={{
              colors: ['#048c4c', '#ffffff'],
              colors: ['#048c4c', '#82bf26'],
              useAngle: true,
            }}
            ViewComponent={LinearGradient}
            titleStyle={{
              color: 'white',
              fontSize: 22,
              fontWeight: 'bold',
              letterSpacing: 0.5,
              marginLeft: -10,
              top: 10,
              textAlign: 'center',
            }}
          leftIcon={(
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#transparent',
                  marginLeft: 10,
                  marginRight: 0,
                  top: 30,
                  position: 'absolute',
                  flex: 1,
                  zIndex: 99,
                }}
                icon={{
                  type: 'ionicon',
                  name: 'ios-arrow-back',
                  tintColor: '#white',
                  size: 30,
                }}
              />
          )}
        />
      
      <View style={styles.container}>
      <LinearGradient colors={["#048c4c","#82bf26"]} style={styles.oval} useAngle={true} angle={100}>
      </LinearGradient>
      </View>

      <View style={styles.containerImg}>
        <Image source={vcImg} style={styles.vcImg} />
          <Text
            style={{
              color: 'white',
              fontSize: 14,
              fontWeight: 'bold',
              letterSpacing: 1.5,
              position: 'absolute',
              zIndex: 5,
              bottom: 45,
              left: 17,
            }}>{this.state.profileData.name}
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 12,
              fontWeight: 'bold',
              letterSpacing: 1.5,
              position: 'absolute',
              zIndex: 5,
              bottom: 15,
              left: 17,
            }}>{this.state.profileData.code}
          </Text>
      </View>
          
        <View style={styles.containerText}>
          <View style={{ width: "90%", alignSelf: 'center', }}>
            <View style={{ flexDirection: "row", }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  marginTop: 10,
                  marginBottom: 10,
                  fontWeight: 'bold'
                }}>Kartu Virtual Member WAKimart
              </Text>
            </View>
            <View style={{ flexDirection: "column", }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 10,
                  fontWeight: 'bold',
                  marginBottom: 20,
                  letterSpacing: 0.1,
                }}>SYARAT DAN KEUNTUNGAN KARTU VIRTUAL
              </Text>
            </View>
            <View style={{ flexDirection: "column", }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 10,
                  marginBottom: 5,
                  letterSpacing: 0.1,
                  lineHeight: 12,
                }}>• Kartu Virtual Member, hanya berlaku untuk barang-barang Promosi tertentu (Promo Untung) 
                dan tidak dapat digabungkan dengan program promosi lainnya namun dapat mengajukan installment.{"\n"}
                • Kartu Virtual Member hanya bisa digunakan untuk pemotongan harga pembelanjaan produk tertentu saja.{"\n"}
                • Tidak berlaku untuk seluruh keluarga besar WAKimart.{"\n"}
                • Setiap customer harus menunjukkan kartu virtual jika ingin mendapatkan promo khusus pada showroom 
                yang tersedia.{"\n"}
                • Setiap customer dengna nama/alamat yang sama pada KTP, hanya boleh menukarkan voucher belanja untuk
                program ini sebanyak 1x (kali) saja walaupun mempunyai lebih dari 1 voucher belanja selama periode program.{"\n"}
              </Text>
            </View>
          </View>
        </View>

      <ListItem
          containerStyle={{ height: 120, }}
            linearGradientProps={{
              colors: ['#048c4c', '#82bf26'],
              useAngle: true,
            }}
            ViewComponent={LinearGradient}
          leftIcon={
            <TouchableOpacity onPress={this.onPress}>
              <Avatar
                containerStyle={{
                  marginLeft: 5,
                  marginRight: 10,
                }}
                rounded
                size="large"
                source={{
                  // uri: avatar,
                }}
              />
            </TouchableOpacity>
          }
            title={
              <TouchableOpacity onPress={this.onPress}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginBottom: 5,
                  }}>{this.state.profileData.name}
                </Text>
              </TouchableOpacity>
            }
            titleStyle={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
              marginBottom: 5,
              letterSpacing: 0.5,
            }}
            subtitle={
              <TouchableOpacity onPress={this.onPress}>
              <View style={{ width: "80%", }}>
                <View style={{flexDirection: "row", }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 11,
                      marginBottom: 5,
                    }}>{this.state.profileData.code}
                </Text>
                  <BaseIcon
                    containerStyle={{
                      backgroundColor: '#transparent',
                      margin: -10,
                      marginLeft: -5,
                    }}
                    icon={{
                      type: 'material',
                      name: 'verified-user',
                      color: 'white',
                      size: 15,
                    }}
                  />
                </View>
                <View style={{flexDirection: "column", }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 10,
                      marginBottom: 5,
                    }}>
                      {this.state.country=="id" ? "Bergabung sejak " : "Joined since "}
                      {Moment(this.state.profileData.created_at).format('d MMM YYYY')}
                  </Text>
                </View>
              </View>
              </TouchableOpacity>
            }
            rightIcon={(
              // <TouchableOpacity onPress={this.ComingSoon()}>
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#transparent',
                  marginRight: 0,
                }}
                icon={{
                  type: 'ionicon',
                  name: 'ios-arrow-forward',
                  color: 'white',
                  size: 30,
                }}
              />
              // </TouchableOpacity>
            )}
          />

       
        <View>
          
        </View>
      </ScrollView>
    )
  }
}
