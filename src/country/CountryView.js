import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import {Button} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import logo_moto from '../../assets/images/logo_moto.png';
import BottomToUpCountry from '../animation/BottomToUpCountry';
import RightToLeft from '../animation/RightToLeftCountry';

export default class CountryView extends Component {
    
   static navigationOptions = ({navigation}) => {
        return{
            // title: 'myapp',
            // header: null,
            headerStyle: { borderBottomWidth: 0, height:1 },
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

    componentWillMount() { 
        this.clearAsyncStorage();
    }

    clearAsyncStorage = async() => {
        AsyncStorage.clear();
    }

    goToHome = (country) => {
        AsyncStorage.setItem('country_selected', JSON.stringify(country));
        this.props.navigation.replace('Main');
    }
  render() {
    
    return (
        
        <ScrollView>
        <View style={styles.container}>
            <BottomToUpCountry>
                <Image
                    style={styles.logo_moto}
                    source={logo_moto}
                />
            </BottomToUpCountry>
            
            <Text style={styles.title}>
                Select Country
            </Text>
            <View style={styles.buttonContainer}>
                <RightToLeft isinya={300}>
                <TouchableOpacity
                    onPress={() => this.goToHome("id")}
                >
                    <LinearGradient
                        colors={['#82bf26', '#048c4c']}
                        style={styles.button}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                    >
                    <Text style={styles.buttonText}>
                        I N D O N E S I A
                    </Text>
                </LinearGradient>
                </TouchableOpacity>
                </RightToLeft>
                <RightToLeft isinya={400}>
                <TouchableOpacity
                    onPress={() => this.goToHome("my")}
                >
                    <LinearGradient
                        colors={['#82bf26', '#048c4c']}
                        style={styles.button}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                    >
                    <Text style={styles.buttonText}>
                        M A L A Y S I A
                    </Text>
                    </LinearGradient>
                </TouchableOpacity>
                </RightToLeft>
                <RightToLeft isinya={500}>
                <TouchableOpacity
                    onPress={() => this.goToHome("phl")}
                >
                    <LinearGradient
                        colors={['#82bf26', '#048c4c']}
                        style={styles.button}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                    >
                    <Text style={styles.buttonText}>
                        P H I L L I P I N E S
                    </Text>
                    </LinearGradient>
                </TouchableOpacity>
                </RightToLeft>
                <RightToLeft isinya={600}>
                <TouchableOpacity>
                    <LinearGradient
                        colors={['#82bf26', '#048c4c']}
                        style={styles.button}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                    >
                    <Text style={styles.buttonText}>
                        T H A I L A N D
                    </Text>
                    </LinearGradient>
                </TouchableOpacity>
                </RightToLeft>
                <RightToLeft isinya={700}>
                <TouchableOpacity>
                    <LinearGradient
                        colors={['#82bf26', '#048c4c']}
                        style={styles.button}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                    >
                    <Text style={styles.buttonText}>
                        V I E T N A M
                    </Text>
                    </LinearGradient>
                </TouchableOpacity>
                </RightToLeft>
                <RightToLeft isinya={800}>
                <TouchableOpacity>
                    <LinearGradient
                        colors={['#82bf26', '#048c4c']}
                        style={styles.button}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                    >
                    <Text style={styles.buttonText}>
                        M Y A N M A R
                    </Text>
                    </LinearGradient>
                </TouchableOpacity>
                </RightToLeft>
                <RightToLeft isinya={900}>
                <TouchableOpacity>
                    <LinearGradient
                        colors={['#82bf26', '#048c4c']}
                        style={styles.button}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                    >
                    <Text style={styles.buttonText}>
                        C A M B O D I A
                    </Text>
                    </LinearGradient>
                </TouchableOpacity>
                </RightToLeft>
                <RightToLeft isinya={1000}>
                <TouchableOpacity>
                    <LinearGradient
                        colors={['#82bf26', '#048c4c']}
                        style={styles.button}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                    >
                    <Text style={styles.buttonText}>
                        C H I N A
                    </Text>
                    </LinearGradient>
                </TouchableOpacity>
                </RightToLeft>
                <RightToLeft isinya={1100}>
                <TouchableOpacity>
                    <LinearGradient
                        colors={['#82bf26', '#048c4c']}
                        style={styles.button}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                    >
                    <Text style={styles.buttonText}>
                        S I N G A P O R E
                    </Text>
                    </LinearGradient>
                </TouchableOpacity>
                </RightToLeft>
                
            </View>
            
        </View>
        </ScrollView>
        
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop:100,
    },
    logo_moto:{
        marginTop:-50,
        width: Dimensions.get('window').width,
        resizeMode: 'contain',
    },
    title:{
        marginTop:40,
        fontWeight: "bold",
        fontSize: 35,
    },
    buttonContainer:{
        marginTop:30,
        alignItems: 'center',
    },
    button:{
        height: 50,
        width: Dimensions.get('window').width /1.2,
        borderRadius: 100,
        marginBottom:10,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        // fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 15,
        color: '#ffffff',
        backgroundColor: 'transparent',
      },
});