import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Image,
  KeyboardAvoidingView,
  Animated,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Easing,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { Toast } from 'native-base';
import axios from 'axios';
import bgSrc from '../../assets/images/wallpaper.png';
import spinner from '../../assets/images/loading.gif';
import usernameImg from '../../assets/images/username.png';
import passwordImg from '../../assets/images/password.png';
import eyeImg from '../../assets/images/eye_black.png';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PasswordInputText from 'react-native-hide-show-password-input';
import { TextField } from 'react-native-material-textfield';

const MARGIN = 40;
var name_country = "";
export default class LoginScreen extends Component {

  constructor() {
    super();

    this.state = {
      isLoading: false,
      showPass: true,
      press: false,
      username: "",
      password: "",
      country: "",
    };
    // this.showPass = this.showPass.bind(this);
    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    // this._onPress = this._onPress.bind(this);
    // AsyncStorage.getItem('user', (error, result) => {
    //     if (result) {
    //         const resultParsed = JSON.parse(result)
    //         console.warn(resultParsed);
    //         this.props.navigation.navigate('Home');
    //     }
    //     else
    //     {
    //         console.warn("kosong");
    //     }
    // });
  }

  static navigationOptions = {
    header: null
  };

  componentWillMount() {
    // AsyncStorage.removeItem('user');
    // AsyncStorage.getItem('user', (error, result) => {
    //     if (result) {
    //         const resultParsed = JSON.parse(result)
    //         console.warn(resultParsed);
    //         this.props.navigation.navigate('Home');
    //     }
    //     else
    //     {
    //         console.warn("kosong");
    //     }
    // });
    AsyncStorage.getItem('country_selected', (error, result) => {
      if (result) {
        var a = JSON.parse(result);
        if (a == "id") {
          name_country = "Indonesia";
          this.setState({ country: "Indonesia" });
        }
        else if (a == "my") {
          name_country = "Malaysia";
          this.setState({ country: "Malaysia" });
        }
      }
    });
  }


  showPass = () => {
    if (this.state.showPass === true) {
      this.setState({ showPass: false });
    }
    else {
      this.setState({ showPass: true });
    }
  }

  _onGrow = () => {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();
  }

  goToRegis = () => {
    this.props.navigation.replace('Registration');
  }

  _onPress = () => {

    if (this.state.isLoading) return;

    this.setState({ isLoading: true });
    Animated.timing(this.buttonAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();

    setTimeout(() => {
      this._onGrow();
    }, 2000);

    setTimeout(() => {
      //   Actions.secondScreen();
      this.setState({ isLoading: false });
      this.buttonAnimated.setValue(0);
      this.growAnimated.setValue(0);
    }, 2300);



    axios.post(
      'https://wakimart.com/id/api/login_rn',
      {
        'login': this.state.username,
        'password': this.state.password,
      },
    ).then((response) => {
      if (response.status === 200) {
        AsyncStorage.setItem('user', JSON.stringify(response.data.data));
        // AsyncStorage.getItem('user', (error, result) => {
        //     if (result) {
        //        const resultParsed = JSON.parse(result)
        //        console.warn(resultParsed);
        //     }
        // });
        this._goHome();
      }
    }).catch(() => {
      Toast.show({
        text: 'Email/Phonenumber or Password Wrong!',
        position: 'bottom',
        type: 'danger',
        buttonText: 'Dismiss',
        duration: 3000
      });
    });
  }

  _goHome = () => {
    this.props.navigation.replace('Profile');
  }

  _goBack = () => {
    this.props.navigation.goBack();
  }


  handlerFocus = (input) => {
    this.setState({
      [input]: true
    });
  };

  handlerBlur = (input) => {
    this.setState({
      [input]: false
    });
  };
  render() {
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [Dimensions.get('window').width - MARGIN, MARGIN],
    });
    return (
      <ImageBackground style={styles.picture} >

        <KeyboardAwareScrollView keyboardShouldPersistTaps='always' style={{ flex: 1 }}>

          <View style={styles.containerLogo}>
            {/* <Image source={logoImg} style={styles.imageLogo} /> */}
            <Text style={styles.textLogo}>Welcome to WAKimart {this.state.country}.</Text>
          </View>

          <View style={styles.containerForm}>
            
            <View style={styles.inputWrapperUserInput}>
              <View style={{ marginLeft: 20, marginRight: 20 }}>
                <TextField
                  style={styles.inputUserInput}
                  name='email'
                  label='Email / Phone Number'
                  autoCorrect={false}
                  autoCapitalize="none"
                  returnKeyType='done'
                  baseColor={'#2b2b2b'}
                  tintColor={'#2ace87'}
                  value={this.state.username}
                  onChangeText={(username) => this.setState({ username })}
                />
              </View>
              <View style={{ marginLeft: 20, marginRight: 20, marginBottom: 20, }}>
                <PasswordInputText
                  style={styles.inputUserInput}
                  name='pass'
                  autoCorrect={false}
                  autoCapitalize="none"
                  returnKeyType='done'
                  baseColor={'#2b2b2b'}
                  value={this.state.password}
                  secureTextEntry={this.state.showPass}
                  autoCorrect={false}
                  autoCapitalize="none"
                  returnKeyType='done'
                  onChangeText={(password) => this.setState({ password })}
                />
              </View>
            </View>


            
          </View>

          <View style={styles.containerSign}>
            <Text style={styles.textSign}>Forgot Password?</Text>
          </View>

          <View style={styles.containerButtonSubmit}>
            <Animated.View style={{ width: changeWidth }}>
              <TouchableOpacity
                style={styles.buttonButtonSubmit}
                onPress={this._onPress}
                activeOpacity={1}
              >
                {this.state.isLoading ? (
                  <Image source={spinner} style={styles.imageButtonSubmit} />
                ) : (
                    <LinearGradient
                      colors={['#7ac02f', '#2cce85']}
                      style={styles.buttonG}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    >
                      <Text style={styles.buttonText}>
                        LOGIN
                    </Text>
                    </LinearGradient>
                  )}
              </TouchableOpacity>
              <Animated.View
              // style={[styles.circleButtonSubmit,]}
              />
            </Animated.View>
            <TouchableOpacity
              style={styles.buttonButtonSubmit}
              onPress={() => this.goToRegis()}
            // activeOpacity={1}
            >
              <LinearGradient
                colors={['#7ac02f', '#2cce85']}
                style={styles.buttonG}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.buttonText}>
                  REGISTER
          </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  buttonG: {
    height: 50,
    width: Dimensions.get('window').width - 120,
    borderRadius: 50,
  },
  picture: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    top: 65,
    // width: DEVICE_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F035E0',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: '#F035E0',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: '#F035E0',
  },
  textButtonSubmit: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  imageButtonSubmit: {
    // width: 24,
    // height: 24,
  },
  containerButtonSubmit: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  containerButtonCancel: {
    flex: 1,
    left: 22,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  containerLogo: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 60,
  },
  imageLogo: {
    width: 80,
    height: 80,
  },
  textLogo: {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 40,
    fontSize: 40,
    textAlign: 'center',
    letterSpacing: 2,
  },
  containerForm: {
    flex: 1,
    alignItems: 'center',
  },
  btnEyeForm: {
    position: 'absolute',
    top: 55,
    right: 28,
  },
  iconEyeForm: {
    position: 'absolute',
    top: -50,
    right: 25,
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },
  containerSign: {
    flex: 1,
    bottom:20,
    width: Dimensions.get('window').width - 60,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textSign: {
    color: '#2ace87',
    fontSize: 10,
    backgroundColor: 'transparent',
  },
  buttonButtonSubmit: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#F035E0',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
    marginBottom: 25,
  },
  buttonText: {
    fontSize: 18,
    // fontFamily: 'Gill Sans',
    letterSpacing: 2,
    textAlign: 'center',
    margin: 15,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  buttonButtonCancel: {
    top: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F035E0',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
    width: Dimensions.get('window').width - 40,
  },
  circleButtonSubmit: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: '#F035E0',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: '#F035E0',
  },
  inputUserInput: {
    width: Dimensions.get('window').width - 120,
    letterSpacing: 1,
  },
  inputWrapperUserInput: {
    flex: 1,
  },
  inlineImgUserInput: {
    position: 'absolute',
    tintColor: '#2b2b2b',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 9,
  },

});