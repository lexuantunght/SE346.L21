import React, { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

export function LoadingImage({source, style, resizeMode}) {
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const [loading, setLoading] = useState(true);
    const [target, setTarget] = useState(0.5);

    useEffect(() => {
        if (loading) {
            Animated.timing(fadeAnim, {
                toValue: target,
                duration: 1000,
                useNativeDriver: true
            }).start(() => {target == 1 ? setTarget(0.5) : setTarget(1)});
        } else {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 0,
                useNativeDriver: true
            }).start();
        }
    }, [target]);
    return(
        <Animated.Image source = {source} style = {[style, {backgroundColor: '#c4c4c4', opacity: fadeAnim}]} resizeMode={resizeMode}
        onLoadEnd={() => setLoading(false)}/>
    )
}