import React, { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

export function PulseView({style}) {
    const startValue = useRef(new Animated.Value(1)).current;
    const [endValue, setEndValue] = useState(0.5);

    useEffect(() => {
        Animated.timing(startValue, {
            toValue: endValue,
            duration: 1000,
            useNativeDriver: true
        }).start(() => {endValue == 1 ? setEndValue(0.5) : setEndValue(1)});
    }, [endValue]);

    return(
        <Animated.View style = {[style, {opacity: startValue}]}>

        </Animated.View>
    )
}