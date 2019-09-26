// React native and others libraries imports
import React, { Component } from 'react';
import { Text, Alert, AsyncStorage,View,TextInput, TouchableOpacity, image } from 'react-native';
import { Container, Content, Header, Icon, Button, Left, Right, Body, Title, List, ListItem, Thumbnail, Grid, Col } from 'native-base';
import axios from 'axios';
import Foect from 'foect';
import { Dropdown } from 'react-native-material-dropdown';
// import MapView from 'react-native-maps';

export default class CheckoutView extends Component {
  constructor(props) {
      super(props);
      this.state = {
        // cartItems: [],
        // productsCart: [],
        // hasFetched:true,
        // interest: [],
        // TotalBelanja: 0,
      };
  }

  getInitialState() {
    return {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }
  
  onRegionChange(region) {
    this.setState({ region });
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

  render() { 
    let data = [{
        value: 'Jawa Timur',
      }, {
        value: 'Jawa Barat',
      }, {
        value: 'Jakarta',
      }];

    const left = (
      <Left style={{flex:1}}>
        <Button transparent onPress={() => this.props.navigation.goBack()}>
          <Icon name="ios-arrow-back" size={38} style={{fontSize: 38}} />
        </Button>
      </Left>
    );
    return(
      <View style={styles.container}>
          <Foect.Form
            defaultValue={{
                // email: 'john@doe.com'
            }}
            onValidSubmit={model => {
                console.log(model); // { fullName: 'John Doe', email: 'john@doe.com' ... }
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
                            <Text>{control.value} is not a valid email.</Text>
                        </View> }
                    </View>
                    ) }
                </Foect.Control>
                <Foect.Control name="nomortelepon" required >
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

                <Foect.Control name="namalengkap" required minLength={2} maxLength={32}>
                    { control => (
                    <View>
                        {/* <Text>Password</Text> */}

                        <TextInput
                        style={{height: 40, borderBottomWidth:2,borderBottomColor: '#090',marginBottom:10 }}
                        secureTextEntry={true}
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
                
                <Foect.Control name="province" required>
                    { control => (
                    <View>
                        <Dropdown
                            // style={{borderBottomWidth:0,borderBottomColor: '#090' }}
                            label='Province'
                            data={data}
                            baseColor='#090'
                        />
                    </View>
                    ) }
                </Foect.Control>
                <Foect.Control name="city" required>
                    { control => (
                    <View>
                        <Dropdown
                            style={{height: 40, borderBottomWidth:0,borderBottomColor: '#090',marginBottom:10 }}
                            label='City'
                            data={data}
                            baseColor='#090'
                        />
                    </View>
                    ) }
                </Foect.Control>
                <Foect.Control name="zipcode" required >
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
                        placeholder="Zip Code"
                        />

                        { /* check control state and show error if necessary */ }
                        { control.isTouched &&
                        control.isInvalid && 
                        <Text style={{ color: 'red' }}>Please enter your phone number.</Text> }
                    </View>
                    ) }
                </Foect.Control>
                <Foect.Control name="address" required minLength={2} maxLength={32}>
                    { control => (
                    <View>
                        <TextInput
                        style={{height: 40, borderBottomWidth:2,borderBottomColor: '#090',marginBottom:10 }}
                        secureTextEntry={true}
                        onBlur={control.markAsTouched}
                        onChangeText={(text) => control.onChange(text)}
                        value={control.value}
                        placeholder="Address"
                        />
                    </View>
                    ) }
                </Foect.Control>
                <Foect.Control name="addtionalinformation" required minLength={2} maxLength={32}>
                    { control => (
                    <View>
                        <TextInput
                        style={{height: 40, borderBottomWidth:2,borderBottomColor: '#090',marginBottom:10 }}
                        secureTextEntry={true}
                        onBlur={control.markAsTouched}
                        onChangeText={(text) => control.onChange(text)}
                        value={control.value}
                        placeholder="Additional Information"
                        />
                    </View>
                    ) }
                </Foect.Control>
                {/* <MapView
                    region={this.state.region}
                    onRegionChange={this.onRegionChange}
                /> */}
                <Button 
                style={{
                    backgroundColor: '#090',
                    color: 'yellow',
                    flexDirection: "row",
                    justifyContent: "center"
                }}
                disabled={form.isInvalid} onPress={() => form.submit()} title="Register">
                    <Text>
                        Lanjut Ke Pembayaran
                    </Text>
                </Button>
                </View>
            ) }
            </Foect.Form>
      </View>
    );
  }
}

const styles={
  title: {
    // fontFamily: 'Roboto',
    fontWeight: '100'
  },
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
    paddingLeft: 10,
    // marginTop: 5,
    marginBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
};
