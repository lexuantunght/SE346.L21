import React, { useEffect, useRef } from 'react';
import {
    Dimensions, Animated
} from 'react-native';

export function AnimatedView({style, inside}) {
    const posX = useRef(new Animated.Value(0)).current;
    const xVal = posX.interpolate({
        inputRange: [0, 1],
        outputRange: [Dimensions.get('screen').width, 0],
    });
    const animStyle = {
        transform: [
          {
            translateX: xVal,
          },
        ],
    };
    useEffect(() => {
        Animated.timing(posX, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    }, []);
    return(
        <Animated.View style = {[style, animStyle]}>
            {inside}
        </Animated.View>
    );
}