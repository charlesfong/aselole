import React, { useState, useEffect } from 'react';
import { Animated, Text, View, Easing } from 'react-native';

const CircularAnimation = (props) => {
  const [fadeAnim] = useState(new Animated.Value(0))  // Initial value for opacity: 0
  const [OpacityA] = useState(new Animated.Value(1)) 
  React.useEffect(() => {
    // Animated.loop(
        Animated.parallel([
            Animated.timing(
                fadeAnim,
                {
                  toValue: 1,
                  duration: 1500,
                }
            ),
            Animated.timing(
                OpacityA,
                {
                  toValue: 0.2,
                  duration: 1500,
                }
            )
        ]).start()
    // ).start()
  }, [])

  return (
    <Animated.View               
      style={{
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255,165,0,0.4)', 
        opacity: OpacityA,
        transform: [
            {
                scale: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.9]
                })
            }
        ]      
      }}
    >
    <Animated.View               
      style={{
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,1)', 
        // opacity: OpacityA,
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
    </Animated.View>
    </Animated.View>
  );
}

export default CircularAnimation;