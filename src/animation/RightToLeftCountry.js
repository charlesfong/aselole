import React, { useState, useEffect } from 'react';
import { Animated, Text, View, Dimensions } from 'react-native';

const RightToLeft = (props) => {
  const [fadeAnim] = useState(new Animated.Value(Dimensions.get('window').width/1))  // Initial value for opacity: 0
  
  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 0,
        duration: props.isinya,
      }
    ).start();
  }, [])

  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        marginLeft: fadeAnim,
        // opacity: fadeAnim,         
      }}
    >
      {props.children}
    </Animated.View>
  );
}

export default RightToLeft;