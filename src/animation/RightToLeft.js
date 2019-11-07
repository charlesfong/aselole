import React, { useState, useEffect } from 'react';
import { Animated, Text, View } from 'react-native';

const RightToLeft = (props) => {
  const [fadeAnim] = useState(new Animated.Value(100))  // Initial value for opacity: 0
  
  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 0,
        duration: 300,
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