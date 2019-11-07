import React, { useState, useEffect } from 'react';
import { Animated, Text, View, Easing } from 'react-native';

const FadeOutAnimation = (props) => {
  const [fadeAnim] = useState(new Animated.Value(0))  // Initial value for opacity: 0
  
  React.useEffect(() => {
    Animated.loop(
        Animated.timing(
            fadeAnim,
            {
              toValue: 1,
              duration: 1500,
            }
          )
    ).start()
  }, [])

  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim,  
        transform: [
            {
                scale: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1.1]
                })
            }

        ]      
      }}
    >
      {props.children}
    </Animated.View>
  );
}

export default FadeOutAnimation;