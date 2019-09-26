import React, {Component} from 'react';
import {StyleSheet, View, Text, Image,
    KeyboardAvoidingView,
    Animated,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    Easing,
    TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Toast } from 'native-base';
import axios from 'axios';
import bgSrc from '../../assets/images/wallpaper.png';
import spinner from '../../assets/images/loading.gif';
import usernameImg from '../../assets/images/username.png';
import passwordImg from '../../assets/images/password.png';
import eyeImg from '../../assets/images/eye_black.png';

const MARGIN = 40;

export default class LoginScreen extends Component {

    constructor() {
        super();
    
        this.state = {
          isLoading: false,
          showPass: true,
          press: false,
          username: "",
          password: ""
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
    }  
      

    showPass = () => {
        if (this.state.showPass === true)
        {
            this.setState({showPass: false});
        }
        else
        {
            this.setState({showPass: true});
        }
    }

    _onGrow = () => {
        Animated.timing(this.growAnimated, {
            toValue: 1,
            duration: 200,
            easing: Easing.linear,
        }).start();
    }
    
    _onPress = () => {
        
        if (this.state.isLoading) return;
        
        this.setState({isLoading: true});
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
          this.setState({isLoading: false});
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
            if (response.status === 200)
            {
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

  render() {
    const changeWidth = this.buttonAnimated.interpolate({
        inputRange: [0, 1],
        outputRange: [Dimensions.get('window').width - MARGIN, MARGIN],
      });
    return (
      <ImageBackground style={styles.picture} source={bgSrc}>
        <View style={styles.containerLogo}>
          {/* <Image source={logoImg} style={styles.imageLogo} /> */}
          <Text style={styles.textLogo}>Welcome to WAKimart Indonesia</Text>
        </View>
        <KeyboardAvoidingView behavior="padding" style={styles.containerForm}>
          <View style={styles.inputWrapperUserInput}>
            <Image source={usernameImg} style={styles.inlineImgUserInput} />
            <TextInput
              style={styles.inputUserInput}
              placeholder="Username"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType='done'
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              onChangeText={(username) => this.setState({username})}
            />
          </View>
          <View style={styles.inputWrapperUserInput}>
            <Image source={passwordImg} style={styles.inlineImgUserInput} />
            <TextInput
              style={styles.inputUserInput}
              placeholder="Password"
              secureTextEntry={this.state.showPass}
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType='done'
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              onChangeText={(password) => this.setState({password})}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btnEye}
            onPress={this.showPass}
          >
            <Image source={eyeImg} style={styles.iconEyeForm} />
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <View style={styles.containerSign}>
          <Text style={styles.textSign}>Create Account</Text>
          <Text style={styles.textSign}>Forgot Password?</Text>
        </View>
        <View style={styles.containerButtonSubmit}>
          <Animated.View style={{width: changeWidth}}>
            <TouchableOpacity
              style={styles.buttonButtonSubmit}
              onPress={this._onPress}
              activeOpacity={1}
            >
              {this.state.isLoading ? (
                <Image source={spinner} style={styles.imageButtonSubmit} />
                ) : (
                  <Text style={styles.textButtonSubmit}>LOGIN</Text>
                )}
                
            </TouchableOpacity>
            <Animated.View
              style={[styles.circleButtonSubmit,]}
            />
          </Animated.View>
          
          
          
        </View>
        {/* <View style={styles.containerButtonCancel}>
          <Button block success style={styles.buttonButtonCancel} onPress={this._goHome}>
            <Text style={styles.textButtonSubmit}>CANCEL</Text>
          </Button>
        </View> */}
        
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
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
    width: 24,
    height: 24,
    },
    containerButtonSubmit: {
        flex: 1,
        top: -75,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    containerButtonCancel: {
      flex: 1,
      top: -75,
      left: 22,
      alignItems: 'center',
      justifyContent: 'flex-start',
  },
    containerLogo: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageLogo: {
    width: 80,
    height: 80,
    },
    textLogo: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 20,
    fontSize:50,
    textAlign:'center'
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
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
    },
    containerSign: {
        flex: 1,
        top: 95,
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    textSign: {
        color: 'white',
        backgroundColor: 'transparent',
    },
      buttonButtonSubmit: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F035E0',
        height: MARGIN,
        borderRadius: 20,
        zIndex: 100,
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
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: Dimensions.get('window').width - 40,
        height: 40,
        // marginTop:10,
        marginHorizontal: 20,
        paddingLeft: 45,
        borderRadius: 20,
        color: '#ffffff',
      },
      inputWrapperUserInput: {
        flex: 1,
      },
      inlineImgUserInput: {
        position: 'absolute',
        zIndex: 99,
        width: 22,
        height: 22,
        left: 35,
        top: 9,
      },
  });