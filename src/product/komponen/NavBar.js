import React, { Component } from 'react';
import { Header, Body, Title, Left, Right, Icon } from 'native-base';

export default class NavBar extends Component {
  render() {
    return(
      <Header
        androidStatusBarColor="#090"
        backgroundColor= '#eeeeee'
        headerTintColor='red'
        androidStatusBarColor={"#090"}
        noShadow={true}
        style={{height: 25,borderBottomWidth:0.3,backgroundColor: "white", marginTop: (Platform.OS === 'android') ? 30 : 0}}
        >
        {this.props.left ? this.props.left : < Left style={styles.left} />}
        <Body style={styles.body}>
          <Title style={styles.title}>{this.props.title}</Title>
        </Body>
        {this.props.right ? this.props.right : <Right style={{flex: 1}} />}
      </Header>
    );
  }
}

const styles={
  body: {
    flex:1,
    // textAlign: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
    // color:'#0f0'
  },
  title: {
    // fontFamily: 'Roboto',
    fontWeight: '100',
    // paddingTop:50
    color: 'black',
    height:30,
    fontWeight: 'bold',
    fontSize:25,
    // textAlign: 'center',
    // justifyContent: 'center',
    
    marginBottom:45,
    // marginTop:20,
  },
  left: {
    // flex:1,
    // marginTop:100
  }
};
