import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Text,
    StatusBar,
    
} from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { Avatar, SearchBar, Icon } from 'react-native-elements';
import Slideshow from 'react-native-image-slider-show';
import IconBadge from 'react-native-icon-badge';
import LinearGradient from 'react-native-linear-gradient';
import Search from 'react-native-search-box';

export default class HomeScreen extends React.Component {

static navigationOptions = ({navigation}) => {
    return{
        header: null,
        headerBackground: (
        <LinearGradient
            colors={['#048c4c', '#82bf26']}
            style={{ flex: 1 }}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
        />
        ),
    }
}

state = { frontEndCms: [], products: [], categories: [] };

componentWillMount() {
    axios.get('https://wakimart.com/id/api/fetchFrontendCMS').then(
      response => this.setState({ frontEndCms: response.data })   
    );
    
    axios.get('https://wakimart.com/id/api/fetchProduct').then(
      response => this.setState({ categories: response.data.categories })
    );
    axios.get('https://wakimart.com/id/api/fetchNewProduct').then(
      response => this.setState({ products: response.data.data })
    );
} 

_openDetailProducts = (isi_data) => {
    this.props.navigation.navigate('ProductDetail', {
        data_ne: isi_data,
    });
};

goToCart = () => {
  // return (
  //   <WebView source={{ uri: 'https://facebook.github.io/react-native/' }} style={styles.website} />
  // );
  
    this.props.navigation.navigate('Cart');
}

renderCategories = () => {
    if(this.state.categories!=null&&this.state.categories!="")
    {
        const cellViews = this.state.categories.map(item => (
        <TouchableOpacity key={item.id}>
            <View>
                <Avatar
                rounded
                // size="large"
                height={70}
                width={70}
                source={{
                uri: `https://wakimart.com/id/sources/category/${(item.name)}/icon/${(item.icon)}`,
                }}
                style={{marginRight:5}}
                />
            </View>
        </TouchableOpacity>
        ));
        return (
        <View style={styles.CategorycontainerStyle}>
            {cellViews}
        </View>
        );
    }
};

renderBestSeller = () => {
    if(this.state.products!=null&&this.state.products!="")
    {
      const cellViews = this.state.products.map(item => (
        <TouchableOpacity key={item.id} onPress={() => this._openDetailProducts(item)}>
          <View style={styles.BestSellerCotainerOuterStyle}>
            <View style={styles.BestSellerImageStyle}>
            <Image source={{ uri: `https://wakimart.com/id/sources/product_images/${(item.code).toLowerCase()}/${item.image.substring(2, item.image.length-2)}` }} style={styles.itemOneImage} />
            </View>
            <View style={styles.BestSellerContainerInnerStyle}>
              <Text style={styles.BestSellerTextTitleItem} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.BestSellerTextPrice}>
                Rp. {parseFloat(item.product_prices.member).toLocaleString('en', {maximumFractionDigits:2})}
                {/* Rp. {(item.product_prices.member).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} */}
                {/* Rp. {parseFloat(item.product_prices.member).toLocaleString('en', {maximumFractionDigits:2})} */}
              </Text>
              <Text style={styles.BestSellerTextSold} >
                {/* 0 Terjual */}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ));
      return (
        <View style={styles.BestSellerContainerStyle}>
          {cellViews}
        </View>
      );
    }
  };

  renderRow = (item, sectionId, index) => {
    return (
      <TouchableHightLight
        style={{
          height: rowHeight,
          justifyContent: 'center',
          alignItems: 'center'}}
      >
        <Text>{item.name}</Text>
      </TouchableHightLight>
    );
  }

  updateSearch = (searchText) => {
    axios.get('http://localhost:8080/wakimart/public/api/fetchNewProduct', {
      params: {
        keyword: searchText,
      }
    }).then(
      response => console.log(response)   
    );
  }
  renderSearchBar = () => {
      
    return (
      <View style={{ flexDirection: "row", backgroundColor: "#090", elevation: 5, }}>
        <View style={{ width: '85%', }}>
          <SearchBar
            onChangeText={(text) => {
                  // this.updateSearch(text);
            }}
            searchIcon={{ size: 24 }}
            inputStyle={{
              color: 'black',
              fontSize: 14,
              fontWeight: 'bold',
            }}
            inputContainerStyle={{
              backgroundColor: "white",
              borderRadius: 20,
              height: 30,
            }}
            onSubmitEditing={() => {
              console.log("ke halaman yang di search haruse mek e blom buat");
            }}
            onSearch={(text) => {
              this.updateSearch(text);
            }}
            containerStyle={{
              backgroundColor: "transparent",
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 15,
              borderTopWidth: 0,
              borderBottomWidth: 0,
            }}
            placeholderTextColor={"#168457"}
            placeholder={"WAKimart"}
            value={Search}
          />
        </View>

        <TouchableOpacity onPress={() => this.goToCart()}>
          <View style={{ flexDirection: 'row', }}>
            <IconBadge
              MainElement={
                <View style={{ marginLeft: 18, marginTop: 10, }}>
                  <Icon
                    name='cart-outline'
                    type='material-community'
                    color='white'
                    size={30}
                  />
                </View>
              }
              BadgeElement={
                <Text style={{ color: '#FFFFFF', fontSize: 10, }}>33
                {this.state.BadgeCount}
                </Text>
              }
              IconBadgeStyle={
                {
                  width: 17,
                  height: 17,
                  backgroundColor: '#ff6969',
                  left: 5,
                  top: 20,
                }
              }
            />
          </View>
        </TouchableOpacity>
      </View>
    );
};

render() {
    return (
        <View style={styles.containerStyle}>
            <MyStatusBar backgroundColor="#090" barStyle="light-content" /> 
                <View>
                    {this.renderSearchBar()}
                </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Slideshow 
                        dataSource={this.state.frontEndCms}
                        indicatorSize={0}
                        arrowSize={0}
                        containerStyle={styles.sliderStyle}
                    />
                </View>
                    <Text style={styles.textTitle}>Categories</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {this.renderCategories()}
                </ScrollView>
                    <Text style={styles.textTitle}>Best Seller</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {this.renderBestSeller()}
                </ScrollView>
                    <Text style={styles.textTitle}>Promo Terbaru</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                </ScrollView>   
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

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 25 : StatusBar.currentHeight;

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
        website: {
          marginTop: 20,
          maxHeight: 200,
          width: 320,
          flex: 1
        },
    statusBar: {
        height: STATUSBAR_HEIGHT,
        },
       textTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 0.1,
        flex: 1,
        marginLeft: 17,
        color: '#2d2d2d',
       },
       IconBadge: {
        position:'absolute',
        top:1,
        right:1,
        minWidth:20,
        height:20,
        borderRadius:15,
        backgroundColor: 'yellow'
      },
       textStyle: {
        fontSize: 20
       },
       BestSellerCotainerOuterStyle: {
        marginLeft:5,
        marginRight:5,
        marginBottom:10,
        height: 230,
        flex: 1,
        width: Dimensions.get('window').width / 2.6,
        borderRadius: 15,
        backgroundColor: '#ffffff',
        elevation: 5,
        shadowOpacity: 0.2,
        position: 'relative',
        
      },
      BestSellerImageStyle: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        overflow: 'hidden',
      },
      itemOneImage: {
        height: 170,
        width: '100%',
      },
      BestSellerTextTitleItem: {
        // fontFamily: fonts.primaryRegular,
        fontSize: 10,
        color: 'black',
      },
      BestSellerTextPrice: {
        // fontFamily: fonts.primaryRegular,
        color: '#00aa5c',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 10,
        justifyContent: 'flex-end',
      },
      BestSellerTextSold: {
        // fontFamily: fonts.primaryRegular,
        color: '#2d2d2d',
        textAlign: 'right',
        fontSize: 7,
        marginRight: 10,
        marginTop: 5,
      },
      BestSellerContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        marginRight: 17,
      },
      BestSellerContainerInnerStyle: {
        paddingLeft: 10,
        marginTop: 5,
        marginBottom: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      },
      sliderStyle: {
        width: '100%',
        resizeMode: "stretch",
      },
      CategorycontainerStyle: {
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative',
        flex: 2,
        marginLeft: 15,
        marginBottom: 10,
      },
});

