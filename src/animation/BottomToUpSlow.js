import React, { useState, useEffect } from 'react';
import { Animated, Text, View } from 'react-native';

const BottomToUpSlow = (props) => {
  const [fadeAnim] = useState(new Animated.Value(700))  // Initial value for opacity: 0
  
  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 0,
        duration: 1000,
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

export default BottomToUpSlow;