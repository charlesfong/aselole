import React, { useState, useEffect } from 'react';
import { Animated, Text, View, Easing } from 'react-native';

const ProgressBarAnimation = (props) => {
  const [fadeAnim] = useState(new Animated.Value(1))  // Initial value for opacity: 0
  
  React.useEffect(() => {
    // Animated.loop(
        Animated.timing(
            fadeAnim,
            {
              toValue: 0,
              duration: 1500,
            }
          ).start()
    // ).start()
  }, [])

  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        // transition: width 0.3,
        // marginRight: fadeAnim,  
        transform: [
            {
                // translateX: fadeAnim
                translateX: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1000]
                })
            }
        ]      
      }}
    >
      {props.children}
    </Animated.View>
  );
}

export default ProgressBarAnimation;