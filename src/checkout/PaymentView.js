// React native and others libraries imports
import React, { Component } from 'react';
import { Text, Alert, AsyncStorage,View,TextInput, TouchableOpacity, ScrollView, StatusBar, Image } from 'react-native';
import { Container, Content, Header, Icon, Button, Left, Right, Body, Title, List, ListItem, Thumbnail, Grid, Col } from 'native-base';
import axios from 'axios';
import Foect from 'foect';
import { Dropdown } from 'react-native-material-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import { CheckBox } from 'react-native-elements';
import Navbar from '../product/komponen/NavBar';
import BaseIcon from '../profile/Icon';
// import MapView from 'react-native-maps';

export default class PaymentView extends Component {
  constructor(props) {
      super(props);
      this.state = {
        cartItems: [],
        productsCart: [],
        // hasFetched:true,
        // interest: [],
        TotalBelanja: 0,
      };
  }

  static navigationOptions = ({navigation}) => {
      return{
          // header: null,
          headerStyle: {
            backgroundColor: '#000000'
          },
          // headerBackground: (
          // <LinearGradient
          //     colors={['#048c4c', '#82bf26']}
          //     style={{ flex: 1 }}
          //     start={{x: 0, y: 0}}
          //     end={{x: 1, y: 0}}
          // />
          // ),
      }
  }

  async componentDidMount() {
    let lengthOfArray = this.state.cartItems.length-1;
    AsyncStorage.getItem("CART", (err, res) => {
      if (!res) this.setState({cartItems: []});
      else 
      {
        this.setState({cartItems: []});
        this.setState({cartItems: JSON.parse(res)});
        var url = "https://wakimart.co.id/api/fetchCartProduct/";
        for(var i in this.state.cartItems){
          url += this.state.cartItems[i]['product_id'];
          if(lengthOfArray != i){
            url += "-";
          }
        }
        url=url.substring(0, url.length-1)
        console.log("res :" +res);
        axios.get(url).then(
            response => this.setState({ productsCart: (response.data.data) }, () => {
              // this.state.productsCart = this.state.productsCart.filter(function() { return true; });
              // console.log(this.state.productsCart.filter());
            })
        );
      }
    });
  }
  
  renderRowPrototype = () => {
    
    if(this.state.productsCart!=null&&this.state.productsCart!="")
    {
      let arr3 = [];

      this.state.productsCart.forEach((itm, i) => {
        arr3.push(Object.assign({}, itm, this.state.cartItems[i]));
        this.state.TotalBelanja+=parseFloat(itm.product_prices.member);
        
      });
      this.state.TotalBelanja=this.state.TotalBelanja.toLocaleString('en', {maximumFractionDigits:2});
      const cellViews = arr3.map(item => 
        (
        <TouchableOpacity key={item.id}>
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
          {/* <View style={{width: '10%', justifyContent: 'center',}}>
              <CheckBox
                color= "#24cf8c"
                containerStyle={{ 
                  margin: 0, 
                  padding: 0,}}
                checked={this.state.checked}
              />
          </View> */}
          <View style={{width: '30%',  justifyContent: 'center',}}>
              <Thumbnail
                source={{
                  uri: `https://wakimart.com/id/sources/product_images/${(item.code).toLowerCase()}/${item.image.substring(2, item.image.length - 2)}`
                }} square
                style={{
                  width: 100,
                  height: 100,
                  marginLeft:10,
                  borderRadius: 15,
                  backgroundColor: 'red',
                }} />
          </View>
          <View style={{width: '50%', alignSelf: 'center', marginLeft:45}}>
              <Text style={{ fontSize: 14 }}>
                {item.name}
              </Text>
              <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}>
                Rp. {parseFloat(item.product_prices.member).toLocaleString('en', {maximumFractionDigits:2})}
              </Text>
              {/* <Text style={{fontSize: 14 ,fontStyle: 'italic'}}>Color: {item.color}</Text> */}
              {/* <Text style={{fontSize: 14 ,fontStyle: 'italic'}}>Size: {item.size}</Text> */}
              {/* <Button icon onPress={() => this.setState({ quantity: this.state.quantity > 1 ? this.state.quantity - 1 : 1 })} >
              <Icon name='ios-remove' style={{ color: Colors.navbarBackgroundColor }} />
            </Button> */}
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row', width: '40%' }}>
                <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center', }}>
                  <Text style={{ fontSize: 14 }}>{item.quantity}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      ));
      return (
        <View style={styles.containerDetailPesanan}>
          <Text style={styles.title}>Detail Pesanan</Text>
          {cellViews}
        </View>
      );
    }
  }

  render() { 
    let data = [{
        value: 'Jawa Timur',
      }, {
        value: 'Jawa Barat',
      }, {
        value: 'Jakarta',
      }];

    const left = (
      <Left>
        <Button transparent onPress={() => this.props.navigation.goBack()}>
          <Icon name="ios-arrow-back" size={38} style={{fontSize: 38, marginTop:-40, color:"#090"}} />
          {/* <Text style={{fontWeight: 'bold',fontSize:24,backgroundColor:"#900"}}>OKEe</Text> */}
        </Button>
      </Left>
    );
    return(
      <View style={{marginBottom:150}}>
        <MyStatusBar backgroundColor="#090" barStyle="light-content" />
          <View style={{
              //  flex: 1,
              //  justifyContent: 'center',
              //  alignItems: 'center',
            }}>
            <Navbar left={left} title="Checkout" />
          </View>
        
        
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Metode Pembayaran</Text>
          <Text>Transfer Bank</Text>
          <View style={{alignItems: 'center'}}>
          <Image
                source={require('../../assets/images/bca_logo.png')}
                style={{
                  width: "70%",
                //   height: "40%",
                  resizeMode: 'contain',
            }} />
            <Text>0872888088</Text>
            <Text>A/N: PT WAKI Pasaraya</Text>
          </View>
          <View style = {styles.lineStyle} />
          <Text style={styles.subtitle}>Baca Ketentuan</Text>
          <Text style={{marginBottom:14}}>1. Transfer ke bank sesuai dengan nominal yang tertera.</Text>
          <Text>2. Simpan bukti pembayaran dan kirim bukti ke WhatsApp : 081234511881.</Text>
          <Text style={styles.informasi}>Jika ada informasi yang salah mohon hubungi CS kami via WhatsApp atau hubungi +6281234511881</Text>
          <View style = {styles.lineStyle} />
          <View style={{justifyContent: 'space-between',flexDirection: 'row',}}>
            <Text style={styles.payment}>Total Harga Barang</Text>
            <Text style={styles.payment}>Rp. 3.200.000</Text>
          </View>
          <View style={{justifyContent: 'space-between',flexDirection: 'row',}}>
            <Text style={styles.payment}>Kode Unik</Text>
            <Text style={styles.payment}>Rp. 15</Text>
          </View>
          <View style={{justifyContent: 'space-between',flexDirection: 'row',}}>
            <Text style={styles.payment}>Biaya Pengiriman</Text>
            <Text style={styles.payment}>Rp. 25.000</Text>
          </View>
          <View style = {styles.lineStyle} />
          <View style={{justifyContent: 'space-between',flexDirection: 'row',}}>
            <Text style={styles.total_payment}>Total Pembayaran</Text>
            <Text style={styles.total_payment}>Rp. 3.225.015</Text>
          </View>
          <Button 
            style={{
                backgroundColor: '#0d5',
                flexDirection: "row",
                justifyContent: "center",
                marginBottom:40,
                marginTop:40,
            }}>
            <Text style={{color:"#fff",fontWeight: 'bold',}}>
                Kembali Belanja
            </Text>
          </Button>
        </View>
        </ScrollView>
      </View>
    );
  }
}
const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight;

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 50 : 60;
const styles={
  statusBar: {
    height: STATUSBAR_HEIGHT,
  }, 
  lineStyle:{
    borderWidth: 0.5,
    borderColor:'black',
    margin:10,
  },
  payment:{
    marginTop:4,
    marginBottom:4,
    fontSize:14,
    textAlign: 'center',
    
  },
  total_payment:{
    marginTop:4,
    marginBottom:4,
    fontSize:14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  informasi:{
    marginTop:22,
    fontSize:12,
    textAlign: 'center',
    color: '#999',
    marginBottom:22,
  },
  subtitle: {
    // fontFamily: 'Roboto',
    // fontWeight: '100'
    fontWeight: 'bold',
    fontSize:16,
    color: '#0d5',
    marginBottom:14,
    marginTop:20,
  },
  title: {
    // fontFamily: 'Roboto',
    // fontWeight: '100'
    fontWeight: 'bold',
    fontSize:20,
    textAlign: 'center',
    marginBottom:30,
    marginTop:20,
    
  },
  containerDetailPesanan: {
    justifyContent: 'center',
    marginTop: 20,
    marginLeft:20,
    marginRight:20,
    backgroundColor: '#ffffff',
    paddingLeft: 20,
    shadowOpacity: 0.2,
    marginBottom: 120,
    paddingBottom:50,
    borderRadius: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    paddingRight:20,
    elevation: 5,
  },
  container: {
    justifyContent: 'center',
    marginTop: 20,
    marginLeft:20,
    marginRight:20,
    backgroundColor: '#ffffff',
    paddingLeft: 20,
    shadowOpacity: 0.2,
    marginBottom: 10,
    borderRadius: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    paddingRight:20,
    elevation: 5,
  },
};
