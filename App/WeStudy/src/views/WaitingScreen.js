import React from 'react';
import { View, Image } from 'react-native';

export function WaitingScreen() {
    return(
        <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source = {require('../assets/loading.gif')} style = {{width: 120, height: 120}} resizeMode = 'stretch'/>
        </View>
    )
}