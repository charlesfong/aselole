import React from 'react';
import { Text, Image, View,
    Platform,
    Dimensions,
    AsyncStorage,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    } from 'react-native';
import axios from 'axios';
import { Container, Content, Header, Button, Left, Right, Body, Icon as Icon_native_base, Title, List, Thumbnail, Grid, Col } from 'native-base';
import BaseIcon from '../profile/Icon';
import Navbar from '../product/komponen/NavBar';
import { Avatar, SearchBar, Icon, ListItem } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

export default class HistoryScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        return{
          header: null,/* <Header textHeader='Profile' /> */
          headerTitle: "Pesanan Saya",
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

    state = { status: "" };

    componentWillMount() {
        this.setState({ status: this.props.navigation.state.params.status });
    } 

    reRenderHistory = (status) => {
        this.setState({ status: status });
    }

    renderRowHistory = () => {
            const cellViews = (
            <TouchableOpacity>
                <View style={{
                width: '95%',
                height: 140,
                alignSelf: 'center',
                flexDirection: "row", 
                marginBottom: 10,
                borderRadius: 10,
                backgroundColor: '#efefef',
                marginTop:10,
                elevation: 5,
                shadowOpacity: 0.2,
                }}>
                <View style={{width: '30%',  justifyContent: 'center',}}>
                    <Thumbnail
                        source={{
                        uri: 'https://wakimart.com/id/sources/product_images/wmz10003/Manicure%20_%20Pedicure%20Mini-min.jpeg'
                        //   uri: `https://wakimart.com/id/sources/product_images/${(item.code).toLowerCase()}/${item.image.substring(2, item.image.length - 2)}`
                        }} square
                        style={{
                        width: 100,
                        height: 100,
                        borderRadius: 15,
                        backgroundColor: 'red',
                        }} />
                </View>
                <View style={{width: '45%', alignSelf: 'center',}}>
                    <Text style={{ fontSize: 14 }}>
                        {/* {item.name} */}
                        Nama Produk
                    </Text>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}>
                        Rp. 150.000
                        {/* Rp. {parseFloat(item.product_prices.member).toLocaleString('en', {maximumFractionDigits:2})} */}
                    </Text>
                </View>
                </View>
            </TouchableOpacity>
            )
            return (
                <View style={{marginTop:30}}>
                    <Text style={styles.titleType}>Menunggu Pembayaran</Text>
                    {cellViews}
                </View>
            );
      }
      
    render() {
        const left = (
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="ios-arrow-back" size={38} style={{fontSize: 38, marginTop:-40, color:"#090"}} />
                {/* <Text style={{fontWeight: 'bold',fontSize:24,backgroundColor:"#900"}}>OKEe</Text> */}
              </Button>
            </Left>
        );
        return (
            <View>
            <View>
                {/* <Navbar left={left} title="Checkout" /> */}
            </View>
            
            <ScrollView style={styles.scroll}>
                <LinearGradient colors={["#79e3fe","#635df8","#42385D"]}  style={{flex: 1}}>
                    <StatusBar translucent={true} backgroundColor={'transparent'} />
                    {/* <Navbar left={left} title="Checkout" /> */}
                </LinearGradient>
                <ListItem
                    containerStyle={{
                    height:80,
                    paddingTop:20,
                    marginBottom:-20,
                    // borderBottomWidth:10
                    }}
                    // title="Pesanan Saya"
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
                <View>
                    <ListItem
                        containerStyle={{ 
                            height: 45,
                            marginBottom:10,
                            borderColor: '#e2e2e2',
                            alignContent: 'space-around',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }} 
                            leftIcon={
                                <Left style={{flexDirection: 'row',flex:0.2}}>
                                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                                        <Icon_native_base name="ios-arrow-back" size={38} style={{fontSize: 38,color:"#090",justifyContent: 'center',position: 'absolute', left: 0}} />
                                    </Button>
                                </Left>
                            }
                            title="Pesanan Saya"
                            titleStyle={{
                            color: '#2B2B2B',
                            marginRight:40,
                            marginTop: -13,
                            flex:0.5,
                            height:55,
                            justifyContent: 'center',
                            marginBottom: -19,
                            fontSize: 21,
                            textAlign: 'center',
                            fontWeight: 'bold',
                            }}
                            
                        />   
                        <View style={{flexDirection: "row", paddingBottom:10,borderBottomWidth:5, borderBottomColor:"#cfcfcf"}}>
                                <TouchableOpacity 
                                onPress={() => {
                                    this.reRenderHistory(0);
                                }}
                                style={{ flexDirection: "column", width: '25%', alignItems: 'center', }}>
                                <View 
                                style={this.state.status=="0"?
                                    styles.StatusClicked:
                                    styles.StatusNotClicked}
                                >
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
                                        borderBottomWidth: 1,
                                        borderBottomColor: "#090",
                                    }}>Menunggu{"\n"}
                                    Pembayaran
                                    </Text>
                                </View>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                onPress={() => {
                                    this.reRenderHistory(1);
                                  }}
                                style={{ flexDirection: "column", width: '25%', alignItems: 'center', }}>
                                <View 
                                style={this.state.status=="1"?
                                    styles.StatusClicked:
                                    styles.StatusNotClicked}
                                >
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
                                    this.reRenderHistory(2);
                                }}
                                style={{ flexDirection: "column", width: '25%', alignItems: 'center', }}>
                                <View 
                                style={this.state.status=="2"?
                                    styles.StatusClicked:
                                    styles.StatusNotClicked}
                                >
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
                                    this.reRenderHistory(3);
                                  }} 
                                style={{ flexDirection: "column", width: '25%', alignItems: 'center', }}>
                                <View 
                                style={this.state.status=="3"?
                                    styles.StatusClicked:
                                    styles.StatusNotClicked}
                                >
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
                    {this.renderRowHistory()}
                </View>
            </ScrollView>
            </View>
            );
        }
}

const styles = StyleSheet.create({
    scroll: {
      backgroundColor: 'white',
    //   marginTop:50,
    },
    StatusClicked: {
      borderBottomWidth: 2, 
      borderBottomColor: "#090",
    },
    StatusNotClicked: {

    },
    titleType: {
      fontWeight: 'bold',
      marginLeft: 10,
      marginTop:10,
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
    
