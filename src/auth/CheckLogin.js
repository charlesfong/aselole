import React, {Component} from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import bgSrc from '../../assets/images/wallpaper.png';

export default class CheckLogin extends Component {
    
    _checkLogin = () => {
        AsyncStorage.getItem('user', (error, result) => {
            if (result) {
                this.props.navigation.replace('Profile');
            }
            else
            {
                this.props.navigation.replace('Login');
            }
        });
    }

  render() {
    
    return (
      <ImageBackground style={styles.picture} source={bgSrc}>
        {this._checkLogin()}  
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
    }
});