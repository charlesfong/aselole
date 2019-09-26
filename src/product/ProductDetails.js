import React from 'react';
import { Text, Image, View,
    Platform,
    Dimensions,
    AsyncStorage,
    } from 'react-native';
import { Left, Right, Button, Icon, Toast, Text as NBText } from 'native-base';
import Slideshow from 'react-native-image-slider-show';
import Card from './komponen/Card';
import CardSection from './komponen/CardSection';
import Navbar from './komponen/NavBar';
import Colors from './Colors';
import { colors, fonts } from '../styles';
export default class ProductDetailScreen extends React.Component {

  state = { isicart: [], quantity: 1};
  
  

  componentWillMount() {

  }

  bersih = () => {
    AsyncStorage.removeItem("CART");
  }

  addToCarts = (id) => {

    let order_detail = {
      "product_id" : id,
      "quantity" : this.state.quantity,
    }
    AsyncStorage.getItem("CART", (err, res) => {
      if (!res) AsyncStorage.setItem("CART", JSON.stringify(order_detail));
      else {
        var items = JSON.parse(res);

        let id_product = [];
        let qty_product = [];
        Object.keys(items).map(function(key, index) {
          if(key == "product_id"){
            var strTemp = items[key].toString();
            // strTemp.replace("[<>\\[\\],-]", "");
            let arrTemp = strTemp.split(",");
            for (let tempIsi of arrTemp) {
              id_product.push(tempIsi);
            }
          }
          else if(key == "quantity"){
            var strTemp = items[key].toString();
            // strTemp.replace("[<>\\[\\],-]", "");
            let arrTemp = strTemp.split(",");
            for (let tempIsi of arrTemp) {
              qty_product.push(tempIsi);
            }
          }
        });
        id_product.push(order_detail['product_id']);
        qty_product.push(order_detail['quantity']);
        let myItems = {
          "product_id" : id_product,
          "quantity" : qty_product,
        }
        items = myItems;
        AsyncStorage.setItem('CART', JSON.stringify(items));
        console.warn(items.product_id[0]);
      }
      Toast.show({
        text: 'Product added to your cart !',
        position: 'bottom',
        type: 'success',
        buttonText: 'Tutup',
        duration: 3000
      });
    });
  }

  addToCart = (id) => {

    var data = 
      {
        product_id : id,
        quantity : this.state.quantity
      }
    ;
    AsyncStorage.getItem("CART", (err, res) => {
      if (!res) AsyncStorage.setItem("CART", JSON.stringify([data]));
      else {
        var items = JSON.parse(res);
        items.push(data);
        console.log("items :"+JSON.stringify(items)  );
        AsyncStorage.setItem("CART", JSON.stringify(items));
      }
      Toast.show({
        text: 'Product added to your cart !',
        position: 'bottom',
        type: 'success',
        buttonText: 'Dismiss',
        duration: 3000
      });
    });
  }
  
  async setValue(items) {
    await AsyncStorage.setItem('CART', JSON.stringify(items));
  }

  goToCart() {
    this.props.navigation.navigate('Cart');
  }

  render() {
    const left = (
      <Left style={{ flex: 1 }}>
        <Button onPress={() => this.props.navigation.goBack()} transparent>
          <Icon name='ios-arrow-back' />
        </Button>
      </Left>
    );
    const right = (
      <Right style={{ flex: 1 }}>
        <Button onPress={() => this.goToCart()} transparent>
          <Icon name='ios-cart' />
        </Button>
      </Right>
    );
    const { navigation } = this.props;
    const data_ne = navigation.getParam('data_ne');
    const img= data_ne.image.substring(2, data_ne.image.length-2);
    const dimensions = Dimensions.get('window');
    const imageHeight = Math.round(dimensions.width * 9 / 16);
    const imageWidth = dimensions.width;
    
    return (
      <View>
        <Navbar left={left} right={right} />
        <Card> 
          <Slideshow 
            dataSource={[
              { url: `https://wakimart.com/id/sources/product_images/${(data_ne.code).toLowerCase()}/${data_ne.image.substring(2, data_ne.image.length-2)}` }
            ]}
          />
          <CardSection>
            {/* <Text>{data_ne.name}{"\n"}{"\n"}Rp. {data_ne.product_prices.member}</Text> */}
            <Text style={styles.itemThreeTitle}>
              {/* {data_ne.name}{"\n"}{"\n"} */}
              <Text style={styles.itemThreePrice}>
              {/* Rp. {(data_ne.product_prices.member.substring(0, data_ne.product_prices.member.length-3)).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,')} */}
              </Text>
            </Text>
          </CardSection>
          <CardSection>
            <Text style={styles.itemThreeTitle}>
              Deskripsi Produk{"\n"}
              <Text style={styles.itemThreeSubtitle}>
                {data_ne.description}
              </Text>
              {/* <HTML html={data_ne.description} /> */}
            </Text>
          </CardSection>
          <CardSection style={{ flex: 1 }}>
            <Text style={{flex: 1,justifyContent: 'center',alignItems: 'center',textAlignVertical: 'center'}}>Quantity:</Text>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Button block icon onPress={() => this.setState({ quantity: this.state.quantity -1 })} >
                <Icon name='ios-remove' style={{ color: Colors.navbarBackgroundColor }} />
              </Button>
              <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center', paddingLeft: 30, paddingRight: 30 }}>
                <Text style={{ fontSize: 18 }}>{this.state.quantity}</Text>
              </View>
              <Button block icon onPress={() => this.setState({ quantity: this.state.quantity + 1 })}>
                <Icon style={{ color: Colors.navbarBackgroundColor }} name='ios-add' />
              </Button>
            </View>
          </CardSection>
          <View style={{marginTop:10}}>
            <Button block success onPress={() => this.addToCart(data_ne.id)}>
              <Text>Beli</Text>
            </Button>
          </View>
          
          <CardSection>
            <Text>
              <Text style={styles.itemThreeTitle}>
                Informasi Produk
              </Text>
              <Image
                source={
                  { uri: `https://wakimart.com/id/sources/product_images/howto/wme20002c/wme20002c_howto` }
                }
                style={styles.itemInformationProduct}
              />
            </Text>
            
            {/* <Image source={{ url: `https://wakimart.com/id/sources/product_images/howto/wme20002c/wme20002c_howto` }} /> */}
          </CardSection>
          
        </Card>
      </View>
    );
  }
}

const styles = {
    thumbnailStyle: {
        height: 100,
        width: 100
    },
    headerTextStyle: {
        
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    container: {
        flex: 1,
        backgroundColor: colors.white,
      },
      tabsContainer: {
        alignSelf: 'stretch',
        marginTop: 30,
      },
      itemOneContainer: {
        flex: 1,
        width: Dimensions.get('window').width / 2 - 40,
      },
      itemOneImageContainer: {
        borderRadius: 3,
        overflow: 'hidden',
      },
      itemOneImage: {
        height: 200,
        width: Dimensions.get('window').width / 2 - 40,
      },
      itemOneTitle: {
        // fontFamily: fonts.primaryRegular,
        fontSize: 15,
      },
      itemOneSubTitle: {
        // fontFamily: fonts.primaryRegular,
        fontSize: 13,
        color: '#B2B2B2',
        marginVertical: 3,
      },
      itemOnePrice: {
        // fontFamily: fonts.primaryRegular,
        fontSize: 15,
      },
      itemOneRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
      },
      itemOneContent: {
        marginTop: 5,
        marginBottom: 10,
      },
      itemTwoContainer: {
        paddingBottom: 10,
        backgroundColor: 'white',
        marginVertical: 5,
      },
      itemTwoContent: {
        padding: 20,
        position: 'relative',
        marginHorizontal: Platform.OS === 'ios' ? -15 : 0,
        height: 150,
      },
      itemTwoTitle: {
        color: colors.white,
        // fontFamily: fonts.primaryBold,
        fontSize: 20,
      },
      itemTwoSubTitle: {
        color: colors.white,
        // fontFamily: fonts.primaryRegular,
        fontSize: 15,
        marginVertical: 5,
      },
      itemTwoPrice: {
        color: colors.white,
        // fontFamily: fonts.primaryBold,
        fontSize: 20,
      },
      itemTwoImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      itemTwoOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: '#6271da',
        opacity: 0.5,
      },
      itemThreeContainer: {
        backgroundColor: 'white',
      },
      itemThreeSubContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
      },
      itemThreeImage: {
        height: 100,
        width: 100,
      },
      itemThreeContent: {
        flex: 1,
        paddingLeft: 15,
        justifyContent: 'space-between',
      },
      itemThreeBrand: {
        // fontFamily: fonts.primaryRegular,
        fontSize: 14,
        color: '#617ae1',
      },
      itemThreeTitle: {
        // fontFamily: fonts.primaryBold,
        fontSize: 16,
        color: '#5F5F5F',
        margin:10,
        flexWrap: "wrap",
      },
      itemThreeSubtitle: {
        // fontFamily: fonts.primaryRegular,
        fontSize: 14,
        color: '#a4a4a4',
        margin:15,
      },
      itemThreeMetaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      itemThreePrice: {
        // fontFamily: fonts.primaryRegular,
        fontSize: 14,
        color: '#ff0000',
        textAlign: 'left',
        alignSelf: 'stretch',
        margin:15,
      },
      itemThreeHr: {
        flex: 1,
        height: 1,
        backgroundColor: '#e3e3e3',
        marginRight: -15,
      },
      badge: {
        backgroundColor: colors.secondary,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
      },
      itemInformationProduct: {
        marginTop:10,
        height: Math.round(Dimensions.get('window').width * 9 / 16),
        width: Dimensions.get('window').width,
      },
};