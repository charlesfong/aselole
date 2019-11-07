import React, { useState, useEffect } from 'react';
import { Animated, Text, View, Dimensions } from 'react-native';

const BottomToUpCountry = (props) => {
  const [fadeAnim] = useState(new Animated.Value(Dimensions.get('window').height/7))  // Initial value for opacity: 0
  
  React.useEffect(() => {
    
    Animated.timing(
      fadeAnim,
      {
        toValue: 0,
        duration: 700,
      }
    ).start();
  }, [])

  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        // marginLeft: fadeAnim,
        top: fadeAnim,         
      }}
    >
      {props.children}
    </Animated.View>
  );
}

export default BottomToUpCountry;