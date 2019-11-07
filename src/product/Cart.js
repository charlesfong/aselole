import React, { Component } from 'react';
import { Text, Alert, AsyncStorage,View,FlatList, TouchableOpacity, image, StatusBar } from 'react-native';
import { Container, Content, Header, Icon, Button, Left, Right, Body, Title, List, ListItem, Thumbnail, Grid, Col } from 'native-base';
import Navbar from './komponen/NavBar';
import axios from 'axios';
import Colors from './Colors';
import BaseIcon from '../profile/Icon';
import { CheckBox } from 'react-native-elements';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default class Cart extends Component {
  constructor(props) {
      super(props);
      this.state = {
        cartItems: [],
        productsCart: [],
        hasFetched:true,
        interest: [],
        TotalBelanja: 0,
      };
  }

  goToCheckout() {
    this.props.navigation.navigate('Checkout');
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

  checkqty = (qty) => {
    console.log(qty);
  }

  minqty = (item) => {
    
  }

  plusqty = (item) => {
    var found = array1.find(function(element) {
      return element > 10;
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
          <View style={{width: '10%', justifyContent: 'center',}}>
              <CheckBox
                color= "#24cf8c"
                containerStyle={{ 
                  margin: 0, 
                  padding: 0,}}
                checked={this.state.checked}
              />
          </View>
          <View style={{width: '30%',  justifyContent: 'center',}}>
              <Thumbnail
                source={{
                  uri: `https://wakimart.com/id/sources/product_images/${(item.code).toLowerCase()}/${item.image.substring(2, item.image.length - 2)}`
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
                <View style={{flexDirection: 'row', width: '30%' }}>
                  <Button icon onPress={() => { item.squantity > 1 ? item.quantity-- : 1 }} >
                    <Icon name='ios-remove' style={{ color: Colors.navbarBackgroundColor }} />
                  </Button>
                </View>
                <View style={{flexDirection: 'row', width: '40%' }}>
                  <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{ fontSize: 14 }}>{item.quantity}</Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', width: '30%' }}>
                  <Button icon onPress={() => { item.quantity++ }}>
                    <Icon style={{ color: Colors.navbarBackgroundColor }} name='add' />
                  </Button>
                </View>
            </View>
          </View>
          <View style={{width: '15%', alignSelf: 'center', justifyContent: 'center',}}>
                <Button transparent onPress={() => this.removeItemPressed(item)}>
                  <BaseIcon
                    containerStyle={{
                      backgroundColor: '#ff6969',
                      borderRadius: 5,
                      width: 28,
                      height: 28,
                      marginLeft: 0,
                      marginRight: 0,
                    }}
                    icon={{
                      type: 'material',
                      name: 'delete-forever',
                      color: 'white',
                      size: 20,
                    }} />
                </Button>
                <Text style={{
                  fontSize: 10,
                  color: '#ff6969',
                  fontWeight: 'bold',}}>
                  Hapus
                </Text>
          </View>
        </View>
      </TouchableOpacity>
      ));
      return (
        <View 
          // style={{elevation: 5,
          // shadowOpacity: 0.2,}}
          >
          {cellViews}
        </View>
      );
    }
  }

  render() { 
    const left = (
      <Left style={{flex:1}}>
        <Button transparent onPress={() => this.props.navigation.goBack()}>
          <Icon name="ios-arrow-back" size={38} style={{fontSize: 38, marginTop:-35, color:"#090"}} />
        </Button>
      </Left>
    );
    return(
      <Container>
        <MyStatusBar backgroundColor="#090" barStyle="light-content" />
        <Navbar left={left} title="Cart" />
        {this.state.cartItems.length <=0 ? (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Icon name="ios-cart" size={38} style={{fontSize: 38, color: '#95a5a6', marginBottom: 7}} />
            <Text style={{color: '#95a5a6'}}>Your cart is empty</Text>
          </View>
          ): (
            <Content style={{paddingRight: 10}}>
              <List>
                {this.renderRowPrototype()}
              </List>
              <Grid style={{marginTop: 20, marginBottom: 10}}>
                <Col style={{paddingLeft: 10,paddingRight: 5}}>
                  <Button onPress={() => this.checkout()} style={{backgroundColor: Colors.navbarBackgroundColor}} block iconLeft>
                    <Icon name='ios-card' />
                    <Text style={{color: '#fdfdfd'}}>Checkout</Text>
                  </Button>
                </Col>
                <Col style={{paddingLeft: 5, paddingRight: 10}}>
                  <Button onPress={() => this.removeAllPressed()} style={{borderWidth: 1, borderColor: Colors.navbarBackgroundColor}} block iconRight transparent>
                    <Text style={{color: Colors.navbarBackgroundColor}}>Emtpy Cart</Text>
                    <Icon style={{color: Colors.navbarBackgroundColor}} name='ios-trash-outline' />
                  </Button>
                </Col>
              </Grid>
            </Content>
        )}  
        <Text style={{position: "absolute", bottom: 20, left:10}}>BELI Rp. {this.state.TotalBelanja}</Text>
        <Button onPress={() => this.goToCheckout()} style={{position: "absolute", bottom: 20, right:10}} block iconLeft>
            <Text style={{color: '#fdfdfd'}}>Checkout</Text>
        </Button>
      </Container>
    );
  }

  removeItemPressed(item) {
    Alert.alert(
      'Remove '+item.name,
      'Are you sure you want this item from your cart ?',
      [
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => this.removeItem(item.id)},
      ]
    )
  }

  removeItem(itemToRemove) {
    let items = [];
    
    this.state.cartItems.map((item) => {
      
      if(JSON.stringify(item.product_id) !== JSON.stringify(itemToRemove) )
        items.push(item);
        // console.log(JSON.stringify(item)+" items : "+JSON.stringify(items));
      });
    // console.log(items);
    this.setState({cartItems: []});
    AsyncStorage.setItem("CART",JSON.stringify(items));
    this.setState({cartItems: items});
    this.render();
    // this.setState({cartItems: items}, () => {
    //   AsyncStorage.setItem("CART",JSON.stringify(items));
    // });
    
    // this.setState({cartItems: []});
    // this.props.navigation.replace('Cart');
  }
  
  removeAllPressed() {
    Alert.alert(
      'Empty cart',
      'Are you sure you want to empty your cart ?',
      [
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => this.removeAll()}
      ]
    )
  }

  apiCart() {
    let lengthOfArray = this.state.cartItems.length-1;
    AsyncStorage.getItem("CART", (err, res) => {
      if (!res) this.setState({cartItems: []});
      else 
      {
        
        this.setState({cartItems: JSON.parse(res)});
        var url = "https://wakimart.co.id/api/fetchCartProduct/";
        for(var i in this.state.cartItems){
          url += this.state.cartItems[i]['product_id'];
          url += "-";
        }
        url=url.substring(0, url.length-1)
        axios.get(url).then(
            response => this.setState({ productsCart: (response.data.data) }, () => {
              this.render();
            })
        );
      }
    });
  }

  removeAll() {
    this.setState({cartItems: []})
    AsyncStorage.setItem("CART",JSON.stringify([]));
  }

  checkout() {
    Actions.checkout({cartItems: this.state.cartItems});
  }

  itemClicked(item) {
    Actions.product({product: item});
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
    fontWeight: '100'
  }
};
