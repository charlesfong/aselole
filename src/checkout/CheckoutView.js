// React native and others libraries imports
import React, { Component } from 'react';
import { Text, Alert, AsyncStorage,View,TextInput, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Container, Content, Header, Icon, Button, Left, Right, Body, Title, List, ListItem, Thumbnail, Grid, Col } from 'native-base';
import axios from 'axios';
import Foect from 'foect';
import { StackActions, NavigationActions } from 'react-navigation';
import { Dropdown } from 'react-native-material-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import { CheckBox } from 'react-native-elements';
import Navbar from '../product/komponen/NavBar';
import BaseIcon from '../profile/Icon';
// import MapView from 'react-native-maps';

export default class CheckoutView extends Component {
  constructor(props) {
      super(props);
      this.state = {
        cartItems: [],
        productsCart: [],
        TotalBelanja: 0,
        UserId: "",
        UserInfo: "",
        // province_data: [],
        province_raw : [],
        // city_data: [],
        city_raw: [],
        agentcode_valid:true,
        branchcode_valid:true,
      };
      const agentcode_valid = true;
      const branchcode_valid = true;
      const province_data = [];
      const city_data = [];
      // this.GoToPayment = this.GoToPayment.bind(this);
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
    AsyncStorage.getItem('user', (error, result) => {
      if (result) {
          var a = JSON.parse(result);
          this.state.UserId=a["id"];
          this.state.UserInfo=a;
          console.log(a);
          // this.props.navigation.replace('Login');
      }
      else
      {
        const resetAction = StackActions.reset({
          index: 0,
          // actions: this.props.navigation.navigate('Login')
          // actions: [NavigationActions.navigate('Login')],
        });
        // this.props.navigation.dispatch(resetAction)
        // this.props.navigation.navigate('Login');
      }
    });
    // this.props.navigation.replace(LoginScreen);
    this.renderProvince();
  }
  
  renderProvince = () => {
    let arr_province = [];
    axios.get('https://wakimart.com/id/api/fetchProvinces').then(
      response => this.setState({ province_raw: response.data.data }, () => {
        // console.log(this.state.province_raw);
        this.state.province_raw.forEach((itm, i) => {
          // arr_province.push(Object.assign({}, itm, this.state.province_raw[i]));
          arr_province.push({ id: this.state.province_raw[i]['id'], value: this.state.province_raw[i]['name'] });
        });
      }) 
    );
    this.province_data=arr_province;
    // this.setState({ province_data: arr_province}); 
  }

  renderCity = (province_name) => {
    console.log(province_name)
    let arr_city = [];
    axios.get('http://localhost:8080/wakimart/public/api/fetchCities_rn', {
      params: {
        province_name: province_name,
      }
    }).then(
      response => this.setState({ city_raw: response.data.data }, () => {
        // console.log(this.state.province_raw);
        // console.log(response);
        this.state.city_raw.forEach((itm, i) => {
          arr_city.push({ id: this.state.city_raw[i]['id'], value: this.state.city_raw[i]['name'] });
        });
      }) 
    );
    this.city_data=arr_city;
    // this.setState({ city_data: arr_city}); 
  }

  // checkAgentCode = (agentcode) => {
  //   if (agentcode=="")
  //   {
  //     this.setState({ agentcode_valid: false });
  //   }
  //   axios.get('http://localhost:8080/wakimart/public/api/getagentbycode', {
  //     params: {
  //       agentcode: agentcode,
  //     }
  //   }).then(
  //     response => console.log("asdf"), () => {
  //       if (response.data!="")
  //       {
  //         this.setState({ agentcode_valid: true });
  //       }
  //       else
  //       {
  //         this.setState({ agentcode_valid: false });
  //       }
  //     }
  //   );
  // }

  checkAgentCode = (agentcode) => {
    axios.get('http://localhost:8080/wakimart/public/api/getagentbycode', {
      params: {
        agentcode: agentcode,
      }
    }).then(
      response => this.setState({ agentcode_valid: false }, () => {
        if (response.data!="")
        {
          this.setState({ agentcode_valid: true });
        }
      }) 
    );
    if (agentcode=="")
    {
      this.setState({ agentcode_valid: true });
    }
  }

  checkBranchCode = (branch_code) => {
    axios.get('http://localhost:8080/wakimart/public/api/getbranchbycode', {
      params: {
        branch_code: branch_code,
      }
    }).then(
      response => this.setState({ branchcode_valid: false }, () => {
        setTimeout(() => {
          if (response.data!="")
          {
            this.setState({ branchcode_valid: true });
          }
        }, 500);
      }) 
    );
    if (branch_code=="")
    {
      setTimeout(() => {
        this.setState({ branchcode_valid: true });
      }, 300);
    }
  }

  // checkBranchCode = (branch_code) => {
  //   axios.get('http://localhost:8080/wakimart/public/api/getbranchbycode', {
  //     params: {
  //       branch_code: branch_code,
  //     }
  //   }).then(
  //     response => this.setState({ branchcode_valid: false }, () => {
  //       if (response.data!="")
  //       {
  //         this.setState({ branchcode_valid: true });
  //       }
  //     }) 
  //   );
  //   if (branch_code=="")
  //   {
  //     this.setState({ branchcode_valid: true });
  //   }
  // }

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
    // console.log(this.state.province_data);
    let data = [{
        name: 'Jawa Timur',
      }, {
        value: 'Jawa Barat',
      }, {
        value: 'Jakarta',
      }];
    let kodeunik = Math.floor((Math.random() * 98) + 1);
    const left = (
      <Left>
        <Button transparent onPress={() => this.props.navigation.goBack()}>
          <Icon name="ios-arrow-back" size={38} style={{fontSize: 38, marginTop:-40, color:"#090"}} />
          {/* <Text style={{fontWeight: 'bold',fontSize:24,backgroundColor:"#900"}}>OKEe</Text> */}
        </Button>
      </Left>
    );
    return(
      <View>
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
          <Text style={styles.title}>Lengkapi Data Diri</Text>
            <Foect.Form
              defaultValue={{
                  // email: 'john@doe.com'
              }}
              onValidSubmit={model => {
                  var url = "http://localhost:8080/wakimart/public/api/checkoutOrder_api";
                  var pindah = this;
                  // this.props.navigation.replace('Payment');
                  axios.get(url, {
                    params: {
                      datane: model,
                      member_id: this.state.UserId,
                      kodeunik: kodeunik,
                      cart: this.state.cartItems,
                    }
                  }).then(function (response) {
                    console.log(response);
                    if (response.data.status=="oke")
                    {
                      pindah.props.navigation.replace('Payment');
                    }
                  })
                  // console.log(model); 
                  // { fullName: 'John Doe', email: 'john@doe.com' ... }
              }}
              >
              { /* you can use form for triggering submit or checking form state(form.isSubmitted, form.isValid, ...) */ }
              { form => (
                  <View>
                  
                  <Foect.Control name="email" required email>
                      { control => (
                      <View>
                          <TextInput
                          style={{height: 40, borderBottomWidth:2,borderBottomColor: '#090',marginBottom:10 }}
                          keyboardType="email-address"
                          onBlur={control.markAsTouched}
                          onChangeText={(text) => control.onChange(text)}
                          value={control.value}
                          placeholder="Email"
                          />

                          { control.isTouched &&
                          control.isInvalid && 
                          <View>
                              <Text style={{ color: 'red' }}>{control.value} is not a valid email.</Text>
                          </View> }
                      </View>
                      ) }
                  </Foect.Control>
                  <Foect.Control name="phone" required >
                      { /* you can use control for getting/setting it's value, checking/updating(control.isValid, control.markAsTouched(), ...) it's state, checking it's errors(control.errors.required) */ }
                      { control => (
                      <View>
                          {/* <Text>Phone Number</Text> */}

                          <TextInput
                          style={{height: 40, borderBottomWidth:2,borderBottomColor: '#090',marginBottom:10 }}
                          // { /* mark control as touched on blur */ }
                          keyboardType='numeric'
                          onBlur={control.markAsTouched}
                          // { /* update control's value */ }
                          onChangeText={(text) => control.onChange(text)}
                          // { /* get control's value */ }
                          value={control.value}
                          placeholder="Phone Number"
                          />

                          { /* check control state and show error if necessary */ }
                          { control.isTouched &&
                          control.isInvalid && 
                          <Text style={{ color: 'red' }}>Please enter your phone number.</Text> }
                      </View>
                      ) }
                  </Foect.Control>

                  <Foect.Control name="fullname" required minLength={2} maxLength={32}>
                      { control => (
                      <View>
                          {/* <Text>Password</Text> */}

                          <TextInput
                          style={{height: 40, borderBottomWidth:2,borderBottomColor: '#090',marginBottom:10 }}
                          onBlur={control.markAsTouched}
                          onChangeText={(text) => control.onChange(text)}
                          value={control.value}
                          placeholder="Full Name"
                          />

                          {/* { control.isTouched &&
                          control.isInvalid && 
                          <View>
                              { control.errors.pattern ?
                              <Text style={{ color: 'red' }}>Please provide a strong password.</Text> : 
                              <Text style={{ color: 'red' }}>Please enter your password.</Text> }
                          </View> } */}
                      </View>
                      ) }
                  </Foect.Control>
                  
                  <Foect.Control name="province-home" >
                      { control => (
                      <View>
                          <Dropdown
                              // style={{borderBottomWidth:0,borderBottomColor: '#090' }}
                              label='Province'
                              data={this.province_data}
                              baseColor='#090'
                              // onChangeText={(text) => control.onChange(text)}
                              // onChange={console.log("asdas")}
                              onChangeText={(text) => {
                                // setTimeout(() => {
                                    control.onChange(text)
                                    this.renderCity(text);
                                    // console.log(text);
                                // }, 2000);
                              }}
                              value={control.value}
                          />
                      </View>
                      ) }
                  </Foect.Control>
                  <Foect.Control name="city-home" >
                      { control => (
                      <View>
                          <Dropdown
                              style={{height: 40, borderBottomWidth:0,borderBottomColor: '#090',marginBottom:10 }}
                              label='City'
                              data={this.city_data}
                              baseColor='#090'
                              onChangeText={(text) => control.onChange(text)}
                              value={control.value}
                          />
                      </View>
                      ) }
                  </Foect.Control>
                  <Foect.Control name="zipcode-home" required >
                      { /* you can use control for getting/setting it's value, checking/updating(control.isValid, control.markAsTouched(), ...) it's state, checking it's errors(control.errors.required) */ }
                      { control => (
                      <View>
                          {/* <Text>Phone Number</Text> */}

                          <TextInput
                          style={{height: 40, borderBottomWidth:2,borderBottomColor: '#090',marginBottom:10 }}
                          // { /* mark control as touched on blur */ }
                          keyboardType='numeric'
                          onBlur={control.markAsTouched}
                          onChangeText={(text) => control.onChange(text)}
                          value={control.value}
                          placeholder="Zip Code"
                          />

                          { /* check control state and show error if necessary */ }
                          { control.isTouched &&
                          control.isInvalid && 
                          <Text style={{ color: 'red' }}>Please enter your phone number.</Text> }
                      </View>
                      ) }
                  </Foect.Control>
                  <Foect.Control name="address-home" required minLength={2} maxLength={32}>
                      { control => (
                      <View>
                          <TextInput
                          style={{height: 40, borderBottomWidth:2,borderBottomColor: '#090',marginBottom:10 }}
                          onBlur={control.markAsTouched}
                          onChangeText={(text) => control.onChange(text)}
                          value={control.value}
                          placeholder="Address"
                          />
                      </View>
                      ) }
                  </Foect.Control>
                  <Foect.Control name="agentcode">
                      { control => (
                      <View>
                          <TextInput
                          style={{height: 40, borderBottomWidth:2,borderBottomColor: '#090',marginBottom:10 }}
                          onBlur={control.markAsTouched}
                          onChangeText={(text) => {
                            control.onChange(text)
                            this.checkAgentCode(text);
                          }}
                          value={control.value}
                          placeholder="Agent Code"
                          />
                          {
                          this.state.agentcode_valid==false && 
                          <View>
                              <Text style={{ color: 'red' }}>{control.value} is not a valid agent code.</Text>
                          </View> }
                      </View>
                      ) }
                  </Foect.Control>
                  <Foect.Control name="branch_code">
                      { control => (
                      <View>
                          <TextInput
                          style={{height: 40, borderBottomWidth:2,borderBottomColor: '#090',marginBottom:10 }}
                          onBlur={control.markAsTouched}
                          onChangeText={(text) => {
                            control.onChange(text)
                            this.checkBranchCode(text);
                          }}
                          value={control.value}
                          placeholder="Branch Code"
                          />
                          {
                          this.state.branchcode_valid==false && 
                          <View>
                              <Text style={{ color: 'red' }}>{control.value} is not a valid branch code.</Text>
                          </View> }
                      </View>
                      ) }
                  </Foect.Control>
                  <Foect.Control name="description">
                      { control => (
                      <View>
                          <TextInput
                          style={{height: 40, borderBottomWidth:2,borderBottomColor: '#090',marginBottom:10 }}
                          onBlur={control.markAsTouched}
                          onChangeText={(text) => control.onChange(text)}
                          value={control.value}
                          placeholder="Additional Information"
                          />
                      </View>
                      ) }
                  </Foect.Control>
                  <Button 
                  style={{
                      backgroundColor: '#0d0',
                      // color: 'yellow',
                      flexDirection: "row",
                      justifyContent: "center",
                      marginBottom:20,
                      marginTop:20,
                  }}
                  // disabled={form.isInvalid} 
                  onPress={() => form.submit()} title="Register">
                      <Text>
                          Lanjut Ke Pembayaran
                      </Text>
                  </Button>
                  </View>
              ) }
              </Foect.Form>
          </View>
          {this.renderRowPrototype()}
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
  title: {
    // fontFamily: 'Roboto',
    // fontWeight: '100'
    fontWeight: 'bold',
    fontSize:30,
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
