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
    Linking,
} from 'react-native';
import axios from 'axios';
import { Avatar, SearchBar, Icon } from 'react-native-elements';
import Slideshow from 'react-native-image-slider-show';
import IconBadge from 'react-native-icon-badge';
import LinearGradient from 'react-native-linear-gradient';
import Search from 'react-native-search-box';
import AsyncStorage from '@react-native-community/async-storage';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import FadeInView from '../animation/FadeInView';
import * as Animatable from 'react-native-animatable';



export default class HomeScreen extends React.Component {

static navigationOptions = ({navigation}) => {
    return{
        // header: null,
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

handleViewRef = ref => this.view = ref;

bounce = () => this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));

state = { frontEndCms: [], products: [], promo: [],categories: [], country: "",searchOn: false, searchResult: []};

componentWillMount() {
  var frontendcms_url = "";
  var categories_url = "";
  var bestseller_url = "";
  var promo_url
  var ini = this;
  AsyncStorage.getItem('country_selected', (error, result) => {
      if (result) {
          var a = JSON.parse(result);
          this.setState({ country: a }, () => {
            frontendcms_url='https://wakimart.com/'+this.state.country+'/api/fetchFrontendCMS';
            categories_url='https://wakimart.com/'+this.state.country+'/api/fetchProduct';
            bestseller_url='https://wakimart.com/'+this.state.country+'/api/bestSeller';
            promo_url='https://wakimart.com/'+this.state.country+'/api/fetchPromo_rn';
          });
      }
  });

  setTimeout(function(){
    axios.get(frontendcms_url).then(
      response => ini.setState({ frontEndCms: response.data })   
    );
    axios.get(categories_url).then(
      response => ini.setState({ categories: response.data.categories })
    );
    axios.get(bestseller_url).then(
      response => ini.setState({ products: response.data.data })
    );
    axios.get(promo_url).then(
      response => ini.setState({ promo: response.data.data })
    );
  }, 1000);

    
} 

_openDetailProducts = (isi_data,tipe) => {
    Linking.canOpenURL('https://wakimart.com').then(supported => {
    if (supported) {
      Linking.openURL('https://wakimart.com/'+this.state.country+'/'+tipe+'/'+isi_data);
    } else {
      console.log("Don't know how to open URI: " + 'https://wakimart.com');
    }
  });
};

goToCategories = (id, kategori) => {
  this.props.navigation.navigate({ 
    routeName: 'Category' , 
    params: { 
      id: id,
      kategori: kategori
    }
  }); 
}

goToCart = () => {
  // return (
  //   <WebView source={{ uri: 'https://facebook.github.io/react-native/' }} style={styles.website} />
  // );
  Linking.canOpenURL('https://wakimart.com').then(supported => {
    if (supported) {
      Linking.openURL('https://wakimart.com');
    } else {
      console.log("Don't know how to open URI: " + 'https://google.com');
    }
  });
  // this.props.navigation.navigate('Cart');
}

renderCategories = () => {
    
    if(this.state.categories!=null&&this.state.categories!="")
    {
        const cellViews = this.state.categories.map(item => (
        <TouchableOpacity key={item.id}
        onPress={() => this.goToCategories(item.id,item.name)}
        >
          <FadeInView>
            <View>
                <Avatar
                rounded
                // size="large"
                height={70}
                width={70}
                source={{
                uri: `https://wakimart.com/${(this.state.country)}/sources/category/${(item.name)}/icon/${(item.icon)}`,
                }}
                style={{marginRight:5}}
                />
            </View>
          </FadeInView>
        </TouchableOpacity>
        ));
        return (
        <View style={styles.CategorycontainerStyle}>
            {cellViews}
        </View>
        );
    }
    else
    {
      var cellViews = [];
      for(let i = 0; i < 10; i++){
        cellViews.push(
          <SkeletonPlaceholder>
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 20,
                  borderWidth: 5,
                  borderColor: "white",
                  alignSelf: "center",
                  // marginRight:5,
                }}
              />
          </SkeletonPlaceholder>
        )
      }
      
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
        <TouchableOpacity key={item.id} 
        onPress={() => this._openDetailProducts(item.id,'product')}
        // style={{width: '50%'}}
        // onPress={() => this._openDetailProducts(item)}
        >
          <FadeInView>
            <View style={styles.BestSellerCotainerOuterStyle}>
              <View style={styles.BestSellerImageStyle}>
              <Image source={{ uri: `https://wakimart.com/${(this.state.country)}/sources/product_images/${(item.code).toLowerCase()}/${item.image.substring(2, item.image.length-2)}` }} style={styles.itemOneImage} />
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
          </FadeInView>
        </TouchableOpacity>
      ));
      return (
        <View style={styles.BestSellerContainerStyle}>
          {cellViews}
        </View>
      );
    }
    else
    {
      var cellViews = [];
      for(let i = 0; i < 10; i++){
        cellViews.push(
          <SkeletonPlaceholder>
              <View style={styles.BestSellerCotainerOuterStyle}>
                <View style={styles.BestSellerImageStyle} />
                <View style={styles.BestSellerContainerInnerStyle} />
              </View>
          </SkeletonPlaceholder>
        )
      }
      
      return (
        <View style={styles.BestSellerContainerStyle}>
          {cellViews}
        </View>
      );
    }
  };

  renderNewPromo = () => {
    if(this.state.promo!=null&&this.state.promo!="")
    {
      const cellViews = this.state.promo.map(item => (
        <TouchableOpacity key={item.id} 
        onPress={() => this._openDetailProducts(item.id,'promo')}
        // style={{width: '50%'}}
        // onPress={() => this._openDetailProducts(item)}
        >
          <FadeInView>
            <View style={styles.NewPromoContainerOuterStyle}>
              <View style={styles.PromoImageStyle}>
              <Image source={{ uri: `https://wakimart.com/${(this.state.country)}/sources/promo_images/${(item.code).toLowerCase()}/${item.image.substring(2, item.image.length-2)}` }} style={styles.NewPromoImage} />
              </View>
            </View>
          </FadeInView>
        </TouchableOpacity>
      ));
      return (
        <View style={styles.BestSellerContainerStyle}>
          {cellViews}
        </View>
      );
    }
    else
    {
      var cellViews = [];
      for(let i = 0; i < 10; i++){
        cellViews.push(
          <SkeletonPlaceholder>
              <View style={styles.BestSellerCotainerOuterStyle}>
                <View style={styles.BestSellerImageStyle} />
                <View style={styles.BestSellerContainerInnerStyle} />
              </View>
          </SkeletonPlaceholder>
        )
      }
      
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
    axios.get('https://wakimart.com/'+this.state.country+'/api/fetchNewProduct', {
    // axios.get('http://localhost:8080/wakimart/public/api/fetchNewProduct', {
      params: {
        keyword: searchText,
      }
    }).then(
      // searchResult
      response => this.setState({ searchResult: response.data.data }, () => {
        
      })     
    );
  }

  ExecuteRenderSearchResult = () => {
    this.setState({ searchOn: true }, () => {
      console.warn(this.state.searchOn);
    });
    
  }
  renderNothing = () => {
    return(
      <View></View>
    );
  };
  
  renderSearchResult = () => {
    
    // if(products!=null&&products!="")
    if(this.state.searchResult!=null&&this.state.searchResult!="")
    {
      const cellViews = this.state.searchResult.map(item => (
      // const cellViews = products.map(item => (
        <TouchableOpacity key={item.id} 
        onPress={() => this._openDetailProducts(item.id)}
        style={{width: '50%'}}
        >
          <FadeInView>
          <View style={styles.SearchResultCotainerOuterStyle}>
            <View style={styles.BestSellerImageStyle}>
            <Image source={{ uri: `https://wakimart.com/${(this.state.country)}/sources/product_images/${(item.code).toLowerCase()}/${item.image.substring(2, item.image.length-2)}` }} style={styles.itemOneImage} />
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
          </FadeInView>
        </TouchableOpacity>
      ));
      return (
        // SearchResultContainerStyle
        // {this.state.searchOn==true ?
        // <View style={this.state.searchOn==true ? styles.SearchResultContainerStyle:styles.BestSellerContainerStyle}>
        <View style={styles.SearchResultContainerStyle}>  
          {cellViews}
        </View>
      );
    }
    else
    {
      var cellViews = [];
      for(let i = 0; i < 10; i++){
        cellViews.push(
          <SkeletonPlaceholder style={{width: '50%'}}>
              <View style={styles.BestSellerCotainerOuterStyle}>
                <View style={styles.BestSellerImageStyle} />
                <View style={styles.BestSellerContainerInnerStyle} />
              </View>
          </SkeletonPlaceholder>
        )
        var check_null=true;
        setTimeout(() => {
          if(this.state.searchResult!=null&&this.state.searchResult!="")
          {

          }
          else
          {
            check_null=false;
          }
        }, 7000);
      }
      
      return (
        <View style={styles.SearchResultContainerStyle}>
          {check_null && cellViews}
          {!check_null && <Text style={{paddingLeft: Dimensions.get('window').width/14 }}>Kosong</Text>}
        </View>
      );
    }
  };
  
  renderSearchBar = () => {
      
    return (
      <View style={{ flexDirection: "row", backgroundColor: "#090", elevation: 5, }}>
        <View style={{ width: '100%', }}>
          <SearchBar
            onChangeText={(text) => {
                  this.updateSearch(text);
            }}
            onCancel={() => {
              console.warn("asdasd");
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
              this.ExecuteRenderSearchResult();
              // console.warn(this.state.searchOn);
              // console.warn("ke halaman yang di search haruse mek e blom buat");
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

        {/* <TouchableOpacity onPress={() => this.goToCart()}>
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
        </TouchableOpacity> */}
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
                    {this.state.searchOn==true ?this.renderNothing():
                    <Slideshow 
                        dataSource={this.state.frontEndCms}
                        indicatorSize={0}
                        arrowSize={0}
                        containerStyle={styles.sliderStyle}
                    />}
                </View>
                    
                    <Text style={styles.textTitle}>
                        {this.state.searchOn==true ?"" :"Categories"}
                    </Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {this.state.searchOn==true ?this.renderNothing():this.renderCategories()}
                </ScrollView>
                    <Text style={styles.textTitle}>{this.state.searchOn==true ? "Search Result " : "Best Seller"}</Text>
                <ScrollView horizontal={this.state.searchOn==true ? false:true} showsHorizontalScrollIndicator={false}>
                {this.state.searchOn==true ? this.renderSearchResult() : this.renderBestSeller()}
                </ScrollView>
                  <Text style={styles.textTitle}>{this.state.searchOn==true ? " " : "New Promo"}</Text>
                <ScrollView horizontal={this.state.searchOn==true ? false:true} showsHorizontalScrollIndicator={false}>
                {this.state.searchOn==true ? this.renderNothing() : this.renderNewPromo()}
                </ScrollView>
                    {/* <Text style={styles.textTitle}>Promo Terbaru</Text> */}
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
       SearchResultCotainerOuterStyle: {
        marginLeft:5,
        marginRight:5,
        marginBottom:10,
        height: Dimensions.get('window').height / 3.7,
        alignContent: 'stretch',
        // flex: 1,
        // alignSelf: 'stretch',
        width: Dimensions.get('window').width / 2.3,
        borderRadius: 15,
        backgroundColor: '#ffffff',
        elevation: 5,
        shadowOpacity: 0.4,
        // position: 'relative',
        
      },
      NewPromoContainerOuterStyle: {
        marginLeft:5,
        marginRight:5,
        marginBottom:Dimensions.get('window').height / 8,
        height: Dimensions.get('window').height / 4.7,
        alignContent: 'stretch',
        
        // flex: 1,
        // alignSelf: 'stretch',
        width: Dimensions.get('window').width / 1.5,
        borderRadius: 15,
        backgroundColor: '#ffffff',
        elevation: 5,
        shadowOpacity: 0.2,
        // position: 'relative',
        
      },
      BestSellerCotainerOuterStyle: {
        marginLeft:5,
        marginRight:5,
        marginBottom:10,
        height: Dimensions.get('window').height / 3.6,
        alignContent: 'stretch',
        // flex: 1,
        // alignSelf: 'stretch',
        width: Dimensions.get('window').width / 2.6,
        borderRadius: 15,
        backgroundColor: '#ffffff',
        elevation: 5,
        shadowOpacity: 0.2,
        // position: 'relative',
        
      },
      BestSellerImageStyle: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,

        overflow: 'hidden',
      },
      PromoImageStyle: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius:15,
        borderBottomRightRadius: 15,
        overflow: 'hidden',
      },
      itemOneImage: {
        height: Dimensions.get('window').height / 4.5,
        width: '100%',
      },
      NewPromoImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'stretch',
      },
      BestSellerTextTitleItem: {
        // fontFamily: fonts.primaryRegular,
        fontSize: Dimensions.get('window').height/68,
        color: 'black',
      },
      BestSellerTextPrice: {
        // fontFamily: fonts.primaryRegular,
        color: '#00aa5c',
        fontSize: Dimensions.get('window').height/60,
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
        // backgroundColor:"#f00"
      },
      SearchResultContainerStyle: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginLeft: Dimensions.get('window').width / 20,
        alignItems: 'flex-start',
        marginTop: Dimensions.get('window').height / 40,
        marginRight: Dimensions.get('window').width / 20,
      },
      // BestSellerContainerStyle: {
      //   // flex: 1,
      //   flexWrap: 'wrap',
      //   flexDirection: 'row',
      //   // justifyContent:"space-between",
      //   // backgroundColor: 'black',
      //   // paddingTop:10,
      //   marginLeft: Dimensions.get('window').width / 20,
      //   alignItems: 'flex-start',
      //   // marginTop: 10,
      //   // marginRight: 17,

      //   // flexDirection: 'row',
      //   // alignContent: 'stretch',
      //   // justifyContent: 'space-around',
      //   // marginTop: 10,
      //   // marginRight: 17,
      // },
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

