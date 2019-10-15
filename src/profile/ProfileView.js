import React, { Component } from 'react';
import { ScrollView, Switch, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Avatar, ListItem } from 'react-native-elements';
// import { HeaderBackButton } from 'react-navigation';
import BaseIcon from './Icon';
import LinearGradient from 'react-native-linear-gradient';
import { StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native';
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
  
})


export default class Profile extends Component {
  

  static navigationOptions = ({navigation}) => {
    return{
      header: null,/* <Header textHeader='Profile' /> */
      headerTitle: "Akun",
      headerTitleStyle: {
        color: 'white'
      },
    //   headerRight:<HeaderBackButton onPress={()=>{navigation.replace('Main')}} />,
    //   headerBackground: (
    //     <LinearGradient
    //       colors={['#048c4c', '#82bf26']}
    //       style={{ flex: 1 }}
    //       start={{x: 0, y: 0}}
    //       end={{x: 1, y: 0}}
    //     />
    //   ),
   }
  }

  state = {
    pushNotifications: true,
    profileData: [],
  }

  componentDidMount() {
    AsyncStorage.getItem('user', (error, result) => {
      if (result) {
          this.setState({ profileData: JSON.parse(result)})
      }
    });
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

  ComingSoon = () => {
    console.warn("Coming Soon");
  }
  render() {
    // const {name} = this.state.profileData
    
    return (
      
      <ScrollView style={styles.scroll}>
          <LinearGradient colors={["#79e3fe","#635df8","#42385D"]}  style={{flex: 1}}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
  </LinearGradient >

      <ListItem
            containerStyle={{
              height:80,
              paddingTop:20,
              marginBottom:-20,
            }}
            title="Akun"
            linearGradientProps={{
              colors: ['#048c4c', '#ffffff'],
              colors: ['#048c4c', '#82bf26'],
              useAngle: true,
            }}
            ViewComponent={LinearGradient}
            titleStyle={{
              color: 'white',
              fontSize: 24,
              fontWeight: 'bold',
              marginBottom: -10,
              letterSpacing: 0.2,
              marginLeft: 5,
            }}
          
        />

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
                    }}>{this.state.profileData.code} Verified Member
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
                    }}>Bergabung sejak Juli 2019
                  </Text>
                </View>
              </View>
              </TouchableOpacity>
            }
            rightIcon={(
              <TouchableOpacity onPress={this.ComingSoon()}>
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#transparent',
                  marginRight: 15,
                }}
                icon={{
                  type: 'ionicon',
                  name: 'ios-settings',
                  color: 'white',
                  size: 30,
                }}
              />
              </TouchableOpacity>
            )}
          />

        <ListItem
          containerStyle={{ 
            height: 140,
            borderBottomWidth: 7,
            borderColor: '#e2e2e2',
            alignContent: 'space-around',
          }} 
            title="Pesanan Saya"
            titleStyle={{
              color: '#2B2B2B',
              marginLeft: 4,
              marginTop: 10,
              marginBottom: 15,
              fontSize: 18,
              fontWeight: 'bold',
            }}
            subtitle={
              <View style={{flexDirection: "row", }}>
                <TouchableOpacity 
                onPress={() => {
                  this.gotoHistory(0);
                  // this.ComingSoon();
                }}
                style={{ flexDirection: "column", width: '25%', alignItems: 'center', }}>
                  <View>
                    <BaseIcon
                      containerStyle={{
                        backgroundColor: '#transparent',
                        marginBottom: 10,
                        marginLeft: 15,
                      }}
                      icon={{
                        type: 'material-community',
                        name: 'wallet',
                        color: '#505B6F',
                        size: 28,
                      }}
                    />
                    <Text
                      style={{
                        color: '#4B4B4B',
                        fontSize: 12,
                        textAlign: 'center',
                        fontWeight: '500',
                        letterSpacing: 0.1,
                      }}>Menunggu{"\n"}
                      Pembayaran
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={() => {
                  // this.gotoHistory(1);
                  this.ComingSoon();
                }}
                style={{ flexDirection: "column", width: '25%', alignItems: 'center', }}>
                  <View>
                    <BaseIcon
                      containerStyle={{
                        backgroundColor: '#transparent',
                        marginBottom: 10,
                        marginLeft: 20,
                      }}
                      icon={{
                        type: 'material-community',
                        name: 'truck-delivery',
                        color: '#505B6F',
                        size: 28,
                      }}
                    />
                    <Text
                      style={{
                        color: '#4B4B4B',
                        fontSize: 12,
                        textAlign: 'center',
                        fontWeight: '500',
                        letterSpacing: 0.1,
                      }}>Proses{"\n"}
                      Pengiriman
                  </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={() => {
                  // this.gotoHistory(2);
                  this.ComingSoon();
                }}
                style={{ flexDirection: "column", width: '25%', alignItems: 'center', }}>
                  <View>
                    <BaseIcon
                      containerStyle={{
                        backgroundColor: '#transparent',
                        marginBottom: 10,
                        marginLeft: 15,
                      }}
                      icon={{
                        type: 'material-community',
                        name: 'check-decagram',
                        color: '#505B6F',
                        size: 28,
                      }}
                    />
                    <Text
                      style={{
                        color: '#4B4B4B',
                        fontSize: 12,
                        textAlign: 'center',
                        fontWeight: '500',
                        letterSpacing: 0.1,
                      }}>Telah{"\n"}
                      Dikirim
                  </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={() => {
                  // this.gotoHistory(3);
                  this.ComingSoon();
                }}
                style={{ flexDirection: "column", width: '25%', alignItems: 'center', }}>
                  <View>
                    <BaseIcon
                      containerStyle={{
                        backgroundColor: '#transparent',
                        marginBottom: 10,
                        marginLeft: 15,
                      }}
                      icon={{
                        type: 'material-community',
                        name: 'swap-horizontal',
                        color: '#505B6F',
                        size: 28,
                      }}
                    />
                    <Text
                      style={{
                        color: '#4B4B4B',
                        fontSize: 12,
                        textAlign: 'center',
                        fontWeight: '500',
                        letterSpacing: 0.1,
                      }}>Semua{"\n"}
                      Transaksi
                  </Text>
                  </View>
                </TouchableOpacity>
              </View>
            }
          />   

        <View>
          <Text
            style={{
              color: '#2B2B2B',
              marginLeft: 20,
              marginTop: 15,
              fontSize: 18,
              fontWeight: 'bold',
            }}>Akun Saya
          </Text>
          <ListItem
            title="Kartu Virtual Member"
            titleStyle={styles.titleStyle}
            subtitle="Lihat kartu visual keanggotaan WAKimart."
            subtitleStyle={styles.subtitleStyle}
            onPress={() => this.ComingSoon()}
            containerStyle={styles.listItemContainer}
            leftIcon={(
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#transparent',
                  marginLeft: 15,
                }}
                icon={{
                  type: 'material',
                  name: 'card-membership',
                  color: '#505B6F',
                }}
              />
            )}
            rightIcon={(
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#transparent',
                  marginRight: 1,
                }}
                // icon={{
                //   type: 'ionicon',
                //   name: 'ios-arrow-forward',
                //   color: '#505B6F',
                //   size: 35,
                // }}
                icon={{
                  type: 'ionicon',
                  name: 'ios-lock',
                  color: '#505B6F',
                  size: 35,
                }}
              />
            )}
          />


          <ListItem
            title="Voucher Saya"
            titleStyle={styles.titleStyle}
            subtitle="Lihat semua voucher spesial yang Anda miliki."
            subtitleStyle={styles.subtitleStyle}
            onPress={() => this.ComingSoon()}
            containerStyle={styles.listItemContainer}
            leftIcon={(
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#transparent',
                  marginLeft: 15,
                }}
                icon={{
                  type: 'material-community',
                  name: 'ticket',
                  color: '#505B6F',
                }}
              />
            )}
            rightIcon={(
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#transparent',
                  marginRight: 1,
                }}
                icon={{
                  type: 'ionicon',
                  // name: 'ios-arrow-forward',
                  name: 'ios-lock',
                  color: '#505B6F',
                  size: 35,
                }}
              />
            )}
          />


          <ListItem
            title="Terakhir Dilihat"
            titleStyle={styles.titleStyle}
            subtitle="Cek kembali produk yang terakhir dilihat."
            subtitleStyle={styles.subtitleStyle}
            onPress={() => this.ComingSoon()}
            containerStyle={styles.listItemContainer}
            leftIcon={(
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#transparent',
                  marginLeft: 15,
                }}
                icon={{
                  type: 'material',
                  name: 'card-travel',
                  color: '#505B6F',
                }}
              />
            )}
            rightIcon={(
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#transparent',
                  marginRight: 1,
                }}
                icon={{
                  type: 'ionicon',
                  // name: 'ios-arrow-forward',
                  name: 'ios-lock',
                  color: '#505B6F',
                  size: 35,
                }}
              />
            )}
          />


          <ListItem
            title="Informasi Akun"
            titleStyle={styles.titleStyle}
            subtitle="Atur detail data dan informasi akun Anda."
            subtitleStyle={styles.subtitleStyle}
            onPress={() => this.ComingSoon()}
            containerStyle={styles.listItemContainer}
            leftIcon={(
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#transparent',
                  marginLeft: 15,
                }}
                icon={{
                  type: 'material',
                  name: 'person-outline',
                  color: '#505B6F',
                }}
              />
            )}
            rightIcon={(
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#transparent',
                  marginRight: 1,
                }}
                icon={{
                  type: 'ionicon',
                  // name: 'ios-arrow-forward',
                  name: 'ios-lock',
                  color: '#505B6F',
                  size: 35,
                }}
              />
            )}
          />


          <ListItem
            title="Pusat Bantuan"
            titleStyle={styles.titleStyle}
            subtitle="Lihat solusi terbaik atau hubungi kami."
            subtitleStyle={styles.subtitleStyle}
            onPress={() => this.ComingSoon()}
            containerStyle={styles.listItemContainer}
            leftIcon={(
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#transparent',
                  marginLeft: 15,
                }}
                icon={{
                  type: 'material',
                  name: 'help-outline',
                  color: '#505B6F',
                }}
              />
            )}
            rightIcon={(
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#transparent',
                  marginRight: 1,
                }}
                icon={{
                  type: 'ionicon',
                  // name: 'ios-arrow-forward',
                  name: 'ios-lock',
                  color: '#505B6F',
                  size: 35,
                }}
              />
            )}
          />


          <ListItem
            title="Pengaturan"
            titleStyle={styles.titleStyle}
            subtitle="Atur dan ubah pengaturan aplikasi."
            subtitleStyle={styles.subtitleStyle}
            onPress={() => this.ComingSoon()}
            containerStyle={styles.listItemContainer}
            leftIcon={(
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#transparent',
                  marginLeft: 15,
                }}
                icon={{
                  type: 'material',
                  name: 'settings',
                  color: '#505B6F',
                }}
              />
            )}
            rightIcon={(
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#transparent',
                  marginRight: 1,
                }}
                icon={{
                  type: 'ionicon',
                  // name: 'ios-arrow-forward',
                  name: 'ios-lock',
                  color: '#505B6F',
                  size: 35,
                }}
              />
            )}
          />
          

          <ListItem
            title="Tentang Kami"
            titleStyle={styles.titleStyle}
            subtitle="Mengetahui lebih dalam tentang WAKimart."
            subtitleStyle={styles.subtitleStyle}
            onPress={() => this.ComingSoon()}
            containerStyle={styles.listItemContainer}
            leftIcon={(
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#transparent',
                  marginLeft: 15,
                }}
                icon={{
                  type: 'material',
                  name: 'info-outline',
                  color: '#505B6F',
                }}
              />
            )}
            rightIcon={(
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#transparent',
                  marginRight: 1,
                }}
                icon={{
                  type: 'ionicon',
                  // name: 'ios-arrow-forward',
                  name: 'ios-lock',
                  color: '#505B6F',
                  size: 35,
                }}
              />
            )}
          />
          

          <ListItem
            title="Keluar"
            titleStyle={styles.titleStyle}
            onPress={() => this.logout()}
            containerStyle={styles.listItemContainer}
            leftIcon={(
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#transparent',
                  marginLeft: 15,
                }}
                icon={{
                  type: 'material',
                  name: 'power-settings-new',
                  color: '#505B6F',
                }}
              />
            )}
          />


        </View>
      </ScrollView>
    )
  }
}
