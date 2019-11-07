import React, {Component} from 'react';
import {StyleSheet, Image, View, Dimensions} from 'react-native';
import moto from '../../assets/images/moto.png';
import wakimart from '../../assets/images/wakimart.png';
import bg_bot from '../../assets/images/Background_bawah.png';
import FadeOutAnimation from './FadeOutAnimation';
import BottomToUp from './BottomToUp';
import BottomToUpSlow from './BottomToUpSlow';
import ProgressBarAnimation from './ProgressBarAnimation';
import CircularAnimation from './CircularAnimation';
import Ellipse_white from '../../assets/images/Ellipse_white.png';
import Ellipse_yellow from '../../assets/images/Ellipse_yellow.png';
import grBar from '../../assets/images/Green-Bar.jpg';

export default class OpeningView extends Component {
    
    componentWillMount() {
        var pindah = this;
        setTimeout(function(){
            pindah.props.navigation.replace('CountryView');
        }, 1500);
    }

    gotoSelectCountry = () => {
        this.props.navigation.navigate('CountryView');
    }

  render() {
    
    return (
        <View style={styles.container}>
            <ProgressBarAnimation>
                <Image
                    style={styles.bar_style}
                    source={grBar}
                />
            </ProgressBarAnimation>
            <View style={styles.container}>
                <View style={styles.container}>
                    <Image
                        style={styles.logo}
                        source={wakimart}
                    />
                    <BottomToUp>
                        <Image
                            style={styles.moto}
                            source={moto}
                        />
                    </BottomToUp>
                </View>
                <View style={{marginBottom:0}}>
                    <CircularAnimation />
                </View>
                <View style={{height: Dimensions.get('window').height/2.5,}}>
                    <BottomToUpSlow>
                        <Image
                            style={styles.bg_bot_style}
                            source={bg_bot}
                        />
                    </BottomToUpSlow>
                </View>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:Dimensions.get('window').height/15,
    },
    containerner:{
        // flex:1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    logo: {
        // width: 300,
        width: Dimensions.get('window').width/1.1,
        resizeMode: 'contain'
    },
    moto: {
        // marginTop:0,
        // width: 200,
        
        resizeMode: 'contain'
    },
    ellipse: {
        // marginTop:-100,
        // position: 'absolute',
        // marginBottom:50,
        // top: 0,
        // bottom: 0,
        // left: 0,
        // right: 0,
        
    },
    bar_style: {
        height: 40,
        // position: 'absolute',
        top: -100,
        // left:0,
        // marginLeft:100,
        // right:0,
        // width:Dimensions.get('window').width,
    },
    bg_bot_style:{
        width: Dimensions.get('window').width,
        height:  Dimensions.get('window').height/1.5
    }
});